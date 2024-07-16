import { MongoCheckoutOrderRepository } from "@/@core/backend/infra/db/mongo/repositories/order/mongoCheckoutOrderRepository"
import { ClientSession } from "mongodb"

export function createMongoCheckoutOrderRepository(
    session?: ClientSession
): MongoCheckoutOrderRepository {
    return new MongoCheckoutOrderRepository(session)
}
