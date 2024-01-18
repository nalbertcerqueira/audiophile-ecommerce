import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"

function createMongoCartRepository(): MongoCartRepository {
    return new MongoCartRepository()
}

export const mongoCartRepository = createMongoCartRepository()
