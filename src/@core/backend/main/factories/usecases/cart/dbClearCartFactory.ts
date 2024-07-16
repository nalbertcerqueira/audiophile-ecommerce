import { createMongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { DbClearCartUseCase } from "@/@core/backend/domain/usecases/cart/dbClearCartUseCase"

function createDbClearCartUseCase(): DbClearCartUseCase {
    const mongoCartRepository = createMongoCartRepository()

    return new DbClearCartUseCase(mongoCartRepository)
}

export const dbClearCartUseCase = createDbClearCartUseCase()
