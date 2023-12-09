import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"

export function createMongoCartRepository() {
    return new MongoCartRepository()
}

export const mongoCartRepository = createMongoCartRepository()
