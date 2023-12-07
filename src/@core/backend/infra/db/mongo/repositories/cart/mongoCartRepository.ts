import { AddCartItemRepository } from "@/@core/backend/domain/repositories/cart/addCartItemRepository"
import { CartProduct, CartProps } from "@/@core/shared/entities/cart/cart"
import { MongoCartItem } from "../../models"
import { mongoHelper } from "../../config/mongo-config"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class MongoCartRepository implements AddCartItemRepository {
    public async addItem(userId: string, product: CartProduct): Promise<Cart> {
        const { productId, slug, name, quantity, price } = product
        await mongoHelper.connect()

        const userCartItemCollection = mongoHelper.db.collection<MongoCartItem>("cartItems")
        await userCartItemCollection.findOneAndUpdate(
            { productId },
            { $inc: { quantity }, $setOnInsert: { slug, name, price, userId } },
            { upsert: true }
        )

        const cartQuery = this.getCartQuery(userId)
        const queryResult = await userCartItemCollection
            .aggregate<CartProps>(cartQuery)
            .toArray()

        return new Cart(queryResult[0])
    }

    private getCartQuery(userId: string) {
        return [
            { $match: { userId } },
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
            { $project: { _id: 0, userId: "$_id", itemCount: 1, totalSpent: 1, items: 1 } }
        ]
    }
}
