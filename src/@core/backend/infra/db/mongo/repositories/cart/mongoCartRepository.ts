import { AddManyCartItemsRepository } from "@/@core/backend/domain/repositories/cart/addManyCartItemsRepository"
import { RemoveCartItemRepository } from "@/@core/backend/domain/repositories/cart/removeCartItemRepository"
import { CartProduct, CartProps } from "@/@core/shared/entities/cart/cart"
import { GetCartItemRepository } from "@/@core/backend/domain/repositories/cart/getCartItemRepository"
import { AddCartItemRepository } from "@/@core/backend/domain/repositories/cart/addCartItemRepository"
import { ClearCartRepository } from "@/@core/backend/domain/repositories/cart/clearCartRepository"
import { GetCartRepository } from "@/@core/backend/domain/repositories/cart/getCartRepository"
import { MongoCartItem } from "../../models"
import { mongoHelper } from "../../config/mongo-config"
import { UserType } from "@/@core/shared/entities/user/user"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { AnyBulkWriteOperation } from "mongodb"
import {
    InsertionDetails,
    RemovalDetails
} from "@/@core/backend/domain/repositories/cart/protocols"

export class MongoCartRepository
    implements
        GetCartRepository,
        GetCartItemRepository,
        AddCartItemRepository,
        AddManyCartItemsRepository,
        ClearCartRepository,
        RemoveCartItemRepository
{
    public async getCartById(userId: string, userType: UserType): Promise<Cart | null> {
        await mongoHelper.connect()

        const foundCart = this.retrieveCart(userId, userType)
        return foundCart
    }

    public async getItem(
        userId: string,
        userType: UserType,
        productId: string
    ): Promise<CartProduct | null> {
        await mongoHelper.connect()

        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const foundCartItem = await cartItemCollection
            .aggregate<CartProduct>([
                { $match: { userId, userType, productId } },
                { $set: { productId: { $toObjectId: "$productId" } } },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "details"
                    }
                },
                {
                    $project: {
                        productId: { $toString: "$productId" },
                        slug: { $first: "$details.slug" },
                        name: { $first: "$details.shortName" },
                        price: { $first: "$details.price" },
                        quantity: "$quantity"
                    }
                }
            ])
            .toArray()

        return foundCartItem[0] || null
    }

    public async addItem(
        userId: string,
        userType: UserType,
        operationInfo: InsertionDetails
    ): Promise<Cart> {
        await mongoHelper.connect()
        const { productId, quantity } = operationInfo
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")

        await cartItemCollection.findOneAndUpdate(
            { userId, userType, productId },
            { $inc: { quantity }, $setOnInsert: { createdAt: new Date() } },
            { upsert: true }
        )

        const foundCart = await this.retrieveCart(userId, userType)
        return foundCart as Cart
    }

    public async addManyItems(
        userId: string,
        userType: UserType,
        products: InsertionDetails[]
    ): Promise<Cart | null> {
        await mongoHelper.connect()

        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const bulkOperations: AnyBulkWriteOperation<MongoCartItem>[] = products.map((item) => {
            const { productId, quantity } = item
            return {
                updateOne: {
                    upsert: true,
                    filter: { userId, userType, productId },
                    update: {
                        $inc: { quantity },
                        $setOnInsert: { createdAt: new Date() }
                    }
                }
            }
        })

        await cartItemCollection.bulkWrite(bulkOperations, { ordered: false })

        const foundCart = await this.retrieveCart(userId, userType)
        return foundCart
    }

    public async removeItem(
        userId: string,
        userType: UserType,
        operationInfo: RemovalDetails
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

        const foundCart = await this.retrieveCart(userId, userType)
        return foundCart
    }

    public async clearCartById(userId: string, userType: UserType): Promise<void> {
        await mongoHelper.connect()

        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        await cartItemCollection.deleteMany({ userId, userType })
    }

    private async retrieveCart(userId: string, userType: UserType): Promise<Cart | null> {
        const queryPipeline = [
            { $match: { userId, userType } },
            { $set: { productId: { $toObjectId: "$productId" } } },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "details"
                }
            },
            {
                $project: {
                    userId: 1,
                    productId: { $toString: "$productId" },
                    slug: { $first: "$details.slug" },
                    name: { $first: "$details.shortName" },
                    price: { $first: "$details.price" },
                    quantity: 1
                }
            },
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
                    itemCount: 1,
                    totalSpent: 1,
                    items: 1,
                    _id: 0
                }
            }
        ]

        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const queryResult = await cartItemCollection
            .aggregate<CartProps>(queryPipeline)
            .toArray()

        return queryResult[0] ? new Cart({ ...queryResult[0] }) : null
    }
}
