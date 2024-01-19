import { MongoCheckoutOrderRepository } from "@/@core/backend/infra/db/mongo/repositories/order/mongoCheckoutOrderRepository"

function createMongoCheckoutOrderRepository() {
    return new MongoCheckoutOrderRepository()
}

export const mongoCheckoutOrderRepository = createMongoCheckoutOrderRepository()
