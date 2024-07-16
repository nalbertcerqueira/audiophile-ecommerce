import { AddCheckoutOrderRepository } from "@/@core/backend/domain/repositories/order/addCheckoutOrderRepository"
import { MongoCheckoutOrder } from "../../models"
import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { UserInfo } from "@/@core/backend/domain/protocols"
import { ClientSession } from "mongodb"
import { mongoHelper } from "../../config/mongo-config"

export class MongoCheckoutOrderRepository implements AddCheckoutOrderRepository {
    constructor(private session?: ClientSession) {}

    public async add(user: UserInfo, order: CheckoutOrder): Promise<void> {
        await mongoHelper.connect()

        const { id, type } = user
        const { items: orderItems, ...orderRest } = order.toJSON()
        const creationDate = new Date()
        const items = orderItems.map(({ productId, quantity, price }) => ({
            productId,
            quantity,
            price
        }))

        const checkoutOrderCollection =
            mongoHelper.db.collection<Omit<MongoCheckoutOrder, "_id">>("checkoutOrders")

        await checkoutOrderCollection.insertOne(
            {
                userId: id,
                userType: type,
                items,
                ...orderRest,
                createdAt: creationDate
            },
            { session: this.session }
        )
    }
}
