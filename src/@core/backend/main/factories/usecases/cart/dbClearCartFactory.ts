import { DbClearCartUseCase } from "@/@core/backend/domain/usecases/cart/dbClearCartUseCase"
import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"

function createDbClearCartUseCase() {
    const mongoCartRepository = new MongoCartRepository()
    const dbClearCartUseCase = new DbClearCartUseCase(mongoCartRepository)

    return dbClearCartUseCase
}

export const dbClearCartUseCase = createDbClearCartUseCase()
