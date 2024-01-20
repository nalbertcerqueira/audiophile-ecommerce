import { AddCheckoutOrderRepository } from "@/@core/backend/domain/repositories/order/addCheckoutOrderRepository"
import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { UserType } from "@/@core/shared/entities/user/user"
import { mongoHelper } from "../../config/mongo-config"
import { MongoCheckoutOrder } from "../../models"

export class MongoCheckoutOrderRepository implements AddCheckoutOrderRepository {
    public async add(
        userId: string,
        userType: UserType,
        order: CheckoutOrder
    ): Promise<boolean> {
        await mongoHelper.connect()

        const creationDate = new Date()
        const { cartItems, ...orderRest } = order.toJSON()

        const checkoutOrderCollection =
            mongoHelper.db.collection<Omit<MongoCheckoutOrder, "_id">>("checkoutOrders")

        const response = await checkoutOrderCollection.insertOne({
            userId,
            userType,
            ...orderRest,
            cartItems: cartItems.map(({ productId, quantity }) => ({ productId, quantity })),
            createdAt: creationDate
        })

        return !!response.insertedId
    }
}
