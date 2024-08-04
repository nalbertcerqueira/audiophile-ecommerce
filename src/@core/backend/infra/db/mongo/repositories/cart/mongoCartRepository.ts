import { AddManyCartItemsRepository } from "@/@core/backend/domain/repositories/cart/addManyCartItemsRepository"
import { RemoveCartItemRepository } from "@/@core/backend/domain/repositories/cart/removeCartItemRepository"
import { UpdateCartItemRepository } from "@/@core/backend/domain/repositories/cart/updateCartItemRepository"
import { GetCartItemRepository } from "@/@core/backend/domain/repositories/cart/getCartItemRepository"
import { AddCartItemRepository } from "@/@core/backend/domain/repositories/cart/addCartItemRepository"
import { CartProduct, CartItem } from "@/@core/shared/entities/cart/cartItem"
import { ClearCartRepository } from "@/@core/backend/domain/repositories/cart/clearCartRepository"
import { GetCartRepository } from "@/@core/backend/domain/repositories/cart/getCartRepository"
import { CartProps, Cart } from "@/@core/shared/entities/cart/cart"
import { MongoCartItem } from "../../models"
import { UserInfo } from "@/@core/backend/domain/repositories/cart/protocols"
import { RemovalDetails } from "@/@core/backend/domain/repositories/cart/protocols"
import { mongoHelper } from "../../config/mongo-config"
import { AnyBulkWriteOperation, ClientSession } from "mongodb"

export class MongoCartRepository
    implements
        GetCartRepository,
        GetCartItemRepository,
        AddCartItemRepository,
        AddManyCartItemsRepository,
        UpdateCartItemRepository,
        ClearCartRepository,
        RemoveCartItemRepository
{
    constructor(private session?: ClientSession) {}

    public async getCartById(user: UserInfo): Promise<Cart | null> {
        await mongoHelper.connect()

        const { id, type } = user
        const foundCart = this.retrieveCart({ id, type })
        return foundCart
    }

    public async getItem(user: UserInfo, productId: string): Promise<CartItem | null> {
        await mongoHelper.connect()

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const result = await cartItemCollection
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
                        quantity: "$quantity",
                        _id: 0
                    }
                }
            ])
            .toArray()

        const item = result[0]

        return item ? new CartItem({ ...item }) : null
    }

    public async addItem(user: UserInfo, item: CartItem): Promise<Cart> {
        await mongoHelper.connect()

        const { id, type } = user
        const { productId, quantity } = item
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

        const cart = await this.retrieveCart({ id, type })
        return cart || Cart.empty()
    }

    public async addManyItems(user: UserInfo, items: CartItem[]): Promise<Cart | null> {
        await mongoHelper.connect()

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const bulkOperations: AnyBulkWriteOperation<MongoCartItem>[] = items.map((item) => {
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

        const foundCart = await this.retrieveCart({ id, type })
        return foundCart
    }

    public async removeItem(
        user: UserInfo,
        operationInfo: RemovalDetails
    ): Promise<Cart | null> {
        await mongoHelper.connect()

        const { id, type: userType } = user
        const type = operationInfo.type
        const { productId, quantity } = operationInfo.item
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

        const foundCart = await this.retrieveCart({ id, type: userType })
        return foundCart
    }

    public async updateItem(
        user: UserInfo,
        item: Pick<CartProduct, "productId" | "quantity">
    ): Promise<Cart> {
        await mongoHelper.connect()

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")

        await cartItemCollection.findOneAndUpdate(
            { userId: id, userType: type, productId: item.productId },
            { $set: { quantity: item.quantity, updatedAt: new Date() } }
        )

        const cart = await this.retrieveCart(user)
        return cart || Cart.empty()
    }

    public async clearCartById(user: UserInfo): Promise<void> {
        await mongoHelper.connect()

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        await cartItemCollection.deleteMany(
            { userId: id, userType: type },
            { session: this.session }
        )
    }

    private async retrieveCart(user: UserInfo): Promise<Cart | null> {
        const { id, type } = user

        //Pipeline de agregação para obter o carrinho de compras no formato
        //aceito pela aplicação
        const queryPipeline = [
            { $match: { userId: id, userType: type } },
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

        if (!queryResult[0]) {
            return null
        }

        return new Cart({
            items: queryResult[0].items.map((item) => new CartItem({ ...item }))
        })
    }
}
