import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"
import { ClientSession } from "mongodb"

export function createMongoCartRepository(session?: ClientSession): MongoCartRepository {
    return new MongoCartRepository(session)
}
