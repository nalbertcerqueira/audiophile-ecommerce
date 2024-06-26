import { AddCheckoutOrderRepository } from "@/@core/backend/domain/repositories/order/addCheckoutOrderRepository"
import { MongoCheckoutOrder } from "../../models"
import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { mongoHelper } from "../../config/mongo-config"
import { UserInfo } from "@/@core/backend/domain/protocols"

export class MongoCheckoutOrderRepository implements AddCheckoutOrderRepository {
    public async add(user: UserInfo, order: CheckoutOrder): Promise<boolean> {
        await mongoHelper.connect()

        const { id, type } = user
        const creationDate = new Date()
        const { cart, ...orderRest } = order.toJSON()
        const items = cart.items.map(({ productId, quantity, price }) => ({
            productId,
            quantity,
            price
        }))

        const checkoutOrderCollection =
            mongoHelper.db.collection<Omit<MongoCheckoutOrder, "_id">>("checkoutOrders")

        const response = await checkoutOrderCollection.insertOne({
            userId: id,
            userType: type,
            items,
            ...orderRest,
            createdAt: creationDate
        })

        return !!response.insertedId
    }
}
