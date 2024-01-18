import { MongoExternalUserRepository } from "@/@core/backend/infra/db/mongo/repositories/externalUser/mongoExternalUserRepository"

function createMongoExternalUserRepository() {
    return new MongoExternalUserRepository()
}

export const mongoExternalUserRepository = createMongoExternalUserRepository()
