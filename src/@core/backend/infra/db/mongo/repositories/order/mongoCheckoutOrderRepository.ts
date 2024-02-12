import { AddCheckoutOrderRepository } from "@/@core/backend/domain/repositories/order/addCheckoutOrderRepository"
import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { mongoHelper } from "../../config/mongo-config"
import { MongoCheckoutOrder } from "../../models"
import { UserDetails } from "@/@core/backend/domain/repositories/protocols"

export class MongoCheckoutOrderRepository implements AddCheckoutOrderRepository {
    public async add(userDetails: UserDetails, order: CheckoutOrder): Promise<boolean> {
        await mongoHelper.connect()

        const { userId, type } = userDetails
        const creationDate = new Date()

        const checkoutOrderCollection =
            mongoHelper.db.collection<Omit<MongoCheckoutOrder, "_id">>("checkoutOrders")

        const response = await checkoutOrderCollection.insertOne({
            userId,
            userType: type,
            ...order.toJSON(),
            createdAt: creationDate
        })

        return !!response.insertedId
    }
}
