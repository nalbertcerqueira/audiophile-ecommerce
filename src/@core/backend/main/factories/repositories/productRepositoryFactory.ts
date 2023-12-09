import { MongoProductRepository } from "@/@core/backend/infra/db/mongo/repositories/product/mongoProductRepository"

function createMongoProductRepository() {
    return new MongoProductRepository()
}

export const mongoProductRepository = createMongoProductRepository()
