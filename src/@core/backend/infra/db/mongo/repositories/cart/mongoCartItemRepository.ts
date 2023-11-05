import { GetCartItemsRepository } from "@/@core/backend/domain/repositories/cart/getCartItemsRepository"
import { GetCartItemByIdRepository } from "@/@core/backend/domain/repositories/cart/getCartItemByIdRepository"
import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { mongoHelper } from "../../config/mongo-config"
import { MongoCartItem } from "../../models"
import { ObjectId } from "mongodb"

export class MongoCartItemRepository
    implements GetCartItemByIdRepository, GetCartItemsRepository
{
    public async getAll(): Promise<CartProduct[]> {
        await mongoHelper.connect()

        const productCollection = mongoHelper.db.collection("products")
        const cartItems = await productCollection
            .aggregate<MongoCartItem>([
                {
                    $project: {
                        productId: "$_id",
                        slug: "$slug",
                        name: "$shortName",
                        price: "$price",
                        quantity: { $literal: 0 },
                        _id: 0
                    }
                }
            ])
            .toArray()

        return cartItems.map(({ productId, ...otherProps }) => {
            return {
                productId: productId.toString(),
                ...otherProps
            }
        })
    }

    public async getById(itemId: string): Promise<CartProduct | null> {
        await mongoHelper.connect()

        try {
            new ObjectId(itemId)
        } catch {
            return null
        }

        const productCollection = mongoHelper.db.collection("products")
        const foundItems = await productCollection
            .aggregate<MongoCartItem>([
                { $match: { _id: new ObjectId(itemId) } },
                {
                    $project: {
                        productId: "$_id",
                        slug: "$slug",
                        name: "$shortName",
                        price: "$price",
                        quantity: { $literal: 0 },
                        _id: 0
                    }
                }
            ])
            .toArray()

        if (!foundItems[0]) {
            return null
        }

        const { productId, ...otherProps } = foundItems[0]
        return {
            productId: productId.toString(),
            ...otherProps
        }
    }
}
