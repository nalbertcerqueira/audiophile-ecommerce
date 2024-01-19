import { AddCheckoutOrderRepository } from "@/@core/backend/domain/repositories/order/addCheckoutOrderRepository"
import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { UserType } from "@/@core/shared/entities/user/user"
import { mongoHelper } from "../../config/mongo-config"
import { MongoCheckoutOrder } from "../../models"

export class MongoCheckoutOrderRepository implements AddCheckoutOrderRepository {
    public async add(userId: string, userType: UserType, order: CheckoutOrder): Promise<void> {
        await mongoHelper.connect()

        const creationDate = new Date()

        const checkoutOrderCollection =
            mongoHelper.db.collection<Omit<MongoCheckoutOrder, "_id">>("checkoutOrders")

        await checkoutOrderCollection.insertOne({
            userId,
            userType,
            ...order.toJSON(),
            createdAt: creationDate,
            updatedAt: creationDate
        })
    }
}
