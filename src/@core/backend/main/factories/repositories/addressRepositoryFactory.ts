import { MongoAddressRepository } from "@/@core/backend/infra/db/mongo/repositories/address/mongoAddressRepository"

function createMongoAddressRepository(): MongoAddressRepository {
    return new MongoAddressRepository()
}

export const mongoAddressRepository = createMongoAddressRepository()
