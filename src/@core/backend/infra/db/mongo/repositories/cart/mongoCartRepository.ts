import { AddCartItemRepository } from "@/@core/backend/domain/repositories/cart/addCartItemRepository"
import { CartProduct, CartProps, UserType } from "@/@core/shared/entities/cart/cart"
import { MongoCartItem } from "../../models"
import { mongoHelper } from "../../config/mongo-config"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { GetCartRepository } from "@/@core/backend/domain/repositories/cart/getCartRepository"
import {
    OperationDetails,
    RemoveCartItemRepository
} from "@/@core/backend/domain/repositories/cart/removeCartItemRepository"
import {
    GetCartItemRepository,
    UserCartItem
} from "@/@core/backend/domain/repositories/cart/getCartItemRepository"
import { ClearCartRepository } from "@/@core/backend/domain/repositories/cart/clearCartRepository"

export class MongoCartRepository
    implements
        GetCartRepository,
        ClearCartRepository,
        AddCartItemRepository,
        GetCartItemRepository,
        RemoveCartItemRepository
{
    public async getCartById(userId: string, userType: UserType): Promise<Cart | null> {
        await mongoHelper.connect()

        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const cartQuery = this.getCartQuery(userId, userType)
        const queryResult = await cartItemCollection.aggregate<CartProps>(cartQuery).toArray()

        return queryResult[0] ? new Cart(queryResult[0]) : null
    }

    public async clearCartById(userId: string, userType: UserType): Promise<void> {
        await mongoHelper.connect()

        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        await cartItemCollection.deleteMany({ userId, userType })
    }

    public async getItem(
        userId: string,
        userType: UserType,
        productId: string
    ): Promise<UserCartItem | null> {
        await mongoHelper.connect()

        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const foundCartItem = await cartItemCollection.findOne({ userId, userType, productId })

        if (foundCartItem) {
            const { productId, slug, name, quantity, price, userId } = foundCartItem
            return { productId, slug, name, quantity, price, userId }
        }

        return null
    }

    public async addItem(
        userId: string,
        userType: UserType,
        product: CartProduct
    ): Promise<Cart> {
        await mongoHelper.connect()
        const { productId, slug, name, quantity, price } = product

        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        await cartItemCollection.findOneAndUpdate(
            { userId, userType, productId },
            { $inc: { quantity }, $setOnInsert: { slug, name, price, createdAt: new Date() } },
            { upsert: true }
        )

        const cartQuery = this.getCartQuery(userId, userType)
        const queryResult = await cartItemCollection.aggregate<CartProps>(cartQuery).toArray()

        return new Cart(queryResult[0])
    }

    public async removeItem(
        userId: string,
        userType: UserType,
        operationInfo: OperationDetails
    ): Promise<Cart | null> {
        await mongoHelper.connect()

        const { type, productId, quantity } = operationInfo
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")

        if (type === "delete") {
            await cartItemCollection.findOneAndDelete({ userId, userType, productId })
        }

        if (type === "decrease") {
            await cartItemCollection.findOneAndUpdate(
                { userId, userType, productId },
                { $inc: { quantity: quantity * -1 } }
            )
        }

        const cartQuery = this.getCartQuery(userId, userType)
        const queryResult = await cartItemCollection.aggregate<CartProps>(cartQuery).toArray()

        return queryResult[0] ? new Cart(queryResult[0]) : null
    }

    private getCartQuery(userId: string, userType: UserType) {
        return [
            { $match: { userId, userType } },
            {
                $group: {
                    _id: "$userId",
                    itemCount: { $sum: "$quantity" },
                    totalSpent: { $sum: { $multiply: ["$quantity", "$price"] } },
                    items: {
                        $push: {
                            productId: "$productId",
                            slug: "$slug",
                            name: "$name",
                            quantity: "$quantity",
                            price: "$price"
                        }
                    }
                }
            },
            {
                $project: {
                    userId: "$_id",
                    userType: { $literal: userType },
                    itemCount: 1,
                    totalSpent: 1,
                    items: 1,
                    _id: 0
                }
            }
        ]
    }
}
