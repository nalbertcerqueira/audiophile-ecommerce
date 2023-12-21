import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"

function createMongoUserRepository(): MongoUserRepository {
    return new MongoUserRepository()
}

export const mongoUserRepository = createMongoUserRepository()
