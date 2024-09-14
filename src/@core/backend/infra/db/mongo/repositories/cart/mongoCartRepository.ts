import { DeleteCartItemRepository } from "@/@core/backend/domain/repositories/cart/deleteCartItemRepository"
import { UpdateCartItemRepository } from "@/@core/backend/domain/repositories/cart/updateCartItemRepository"
import { AddCartItemsRepository } from "@/@core/backend/domain/repositories/cart/addCartItemsRepository"
import { CartProduct, CartItem } from "@/@core/shared/entities/cart/cartItem"
import { ClearCartRepository } from "@/@core/backend/domain/repositories/cart/clearCartRepository"
import { GetCartRepository } from "@/@core/backend/domain/repositories/cart/getCartRepository"
import { CartProps, Cart, createCart } from "@/@core/shared/entities/cart/cart"
import { MongoCartItem } from "../../models"
import { UserInfo } from "@/@core/backend/domain/protocols"
import { mongoHelper } from "../../config/mongo-config"
import { AnyBulkWriteOperation, ClientSession, ObjectId, WithId } from "mongodb"

export class MongoCartRepository
    implements
        GetCartRepository,
        AddCartItemsRepository,
        UpdateCartItemRepository,
        ClearCartRepository,
        DeleteCartItemRepository
{
    constructor(private session?: ClientSession) {}

    public async getCart(user: UserInfo): Promise<Cart | null> {
        await mongoHelper.connect()

        const { id, type } = user
        const foundCart = this.retrieveCart({ id, type })
        return foundCart
    }

    public async addItems(user: UserInfo, items: CartItem[]): Promise<Cart> {
        await mongoHelper.connect()

        const now = new Date()

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const bulkOperations: AnyBulkWriteOperation<MongoCartItem>[] = items.map((item) => {
            const { productId, quantity } = item
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

        const cart = await this.retrieveCart({ id, type })
        return cart || Cart.empty()
    }

    public async deleteItem(user: UserInfo, productId: string): Promise<Cart | null> {
        await mongoHelper.connect()

        const foundItem = await this.findItem(user, productId)
        if (!foundItem) {
            return null
        }

        const { id, type: userType } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")

        await cartItemCollection.findOneAndDelete({ userId: id, userType, productId })

        const foundCart = await this.retrieveCart({ id, type: userType })
        return foundCart || Cart.empty()
    }

    public async updateItem(
        user: UserInfo,
        itemRef: Pick<CartProduct, "productId" | "quantity">
    ): Promise<Cart | null> {
        await mongoHelper.connect()

        const foundItem = await this.findItem(user, itemRef.productId)
        if (!foundItem) {
            return null
        }

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")

        await cartItemCollection.findOneAndUpdate(
            { userId: id, userType: type, productId: itemRef.productId },
            { $set: { quantity: itemRef.quantity, updatedAt: new Date() } }
        )

        const cart = await this.retrieveCart(user)
        return cart || Cart.empty()
    }

    public async clearCart(user: UserInfo): Promise<void> {
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

        return createCart({ items: queryResult[0].items })
    }

    private async findItem(
        user: UserInfo,
        productId: string
    ): Promise<WithId<MongoCartItem> | null> {
        await mongoHelper.connect()

        try {
            new ObjectId(productId)
        } catch {
            return null
        }

        const { id, type } = user
        const cartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        const foundItem = await cartItemCollection.findOne({
            userId: id,
            userType: type,
            productId
        })

        return foundItem
    }
}
