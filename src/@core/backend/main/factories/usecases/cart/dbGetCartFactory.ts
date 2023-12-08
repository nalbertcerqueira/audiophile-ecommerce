import { DbGetCartUseCase } from "@/@core/backend/domain/usecases/cart/dbGetCartUseCase"
import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"

export function createDbGetCartUseCase() {
    const mongoCartRepository = new MongoCartRepository()
    const dbGetCartUseCase = new DbGetCartUseCase(mongoCartRepository)

    return dbGetCartUseCase
}

export const dbGetCartUseCase = createDbGetCartUseCase()
