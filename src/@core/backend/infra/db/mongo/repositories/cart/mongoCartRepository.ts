import { AddManyCartItemsRepository } from "@/@core/backend/domain/repositories/cart/addManyCartItemsRepository"
import { RemoveCartItemRepository } from "@/@core/backend/domain/repositories/cart/removeCartItemRepository"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { GetCartItemRepository } from "@/@core/backend/domain/repositories/cart/getCartItemRepository"
import { AddCartItemRepository } from "@/@core/backend/domain/repositories/cart/addCartItemRepository"
import { ClearCartRepository } from "@/@core/backend/domain/repositories/cart/clearCartRepository"
import { GetCartRepository } from "@/@core/backend/domain/repositories/cart/getCartRepository"
import { Cart, CartProps } from "@/@core/shared/entities/cart/cart"
import { MongoCartItem } from "../../models"
import { UserInfo } from "@/@core/backend/domain/repositories/cart/protocols"
import { mongoHelper } from "../../config/mongo-config"
import { UserType } from "@/@core/shared/entities/user/user"
import {
    InsertionDetails,
    RemovalDetails
} from "@/@core/backend/domain/repositories/cart/protocols"
import { AnyBulkWriteOperation } from "mongodb"

export class MongoCartRepository
    implements
        GetCartRepository,
        GetCartItemRepository,
        AddCartItemRepository,
        AddManyCartItemsRepository,
        ClearCartRepository,
        RemoveCartItemRepository
{
    public async getCartById(user: UserInfo): Promise<Cart | null> {
        await mongoHelper.connect()

        const { id, type } = user
        const foundCart = this.retrieveCart(id, type)
        return foundCart
    }

    public async getItem(user: UserInfo, productId: string): Promise<CartProduct | null> {
        await mongoHelper.connect()

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const foundCartItem = await cartItemCollection
            .aggregate<CartProduct>([
                { $match: { userId: id, userType: type, productId } },
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

    public async addItem(user: UserInfo, operationInfo: InsertionDetails): Promise<Cart> {
        await mongoHelper.connect()
        const { productId, quantity } = operationInfo
        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")

        const now = new Date()

        await cartItemCollection.findOneAndUpdate(
            { userId: id, userType: type, productId },
            {
                $set: { updatedAt: now },
                $inc: { quantity },
                $setOnInsert: { createdAt: now }
            },
            { upsert: true }
        )

        const foundCart = await this.retrieveCart(id, type)
        return foundCart as Cart
    }

    public async addManyItems(
        user: UserInfo,
        products: InsertionDetails[]
    ): Promise<Cart | null> {
        await mongoHelper.connect()

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const bulkOperations: AnyBulkWriteOperation<MongoCartItem>[] = products.map((item) => {
            const { productId, quantity } = item
            const now = new Date()
            return {
                updateOne: {
                    upsert: true,
                    filter: { userId: id, userType: type, productId },
                    update: {
                        $inc: { quantity },
                        $set: { updatedAt: now },
                        $setOnInsert: { createdAt: now }
                    }
                }
            }
        })

        await cartItemCollection.bulkWrite(bulkOperations, { ordered: false })

        const foundCart = await this.retrieveCart(id, type)
        return foundCart
    }

    public async removeItem(
        user: UserInfo,
        operationInfo: RemovalDetails
    ): Promise<Cart | null> {
        await mongoHelper.connect()

        const { id, type: userType } = user
        const { type, productId, quantity } = operationInfo
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")

        if (type === "delete") {
            await cartItemCollection.findOneAndDelete({ userId: id, userType, productId })
        }

        if (type === "decrease") {
            const updatedAt = new Date()
            await cartItemCollection.findOneAndUpdate(
                { userId: id, userType, productId },
                { $set: { updatedAt }, $inc: { quantity: quantity * -1 } }
            )
        }

        const foundCart = await this.retrieveCart(id, userType)
        return foundCart
    }

    public async clearCartById(user: UserInfo): Promise<void> {
        await mongoHelper.connect()

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        await cartItemCollection.deleteMany({ userId: id, userType: type })
    }

    private async retrieveCart(userId: string, userType: UserType): Promise<Cart | null> {
        //Pipeline de agregação para obter o carrinho de compras no formato
        //aceito pela aplicação
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
