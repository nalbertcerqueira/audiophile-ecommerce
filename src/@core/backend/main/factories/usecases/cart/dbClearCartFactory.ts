import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { DbClearCartUseCase } from "@/@core/backend/domain/usecases/cart/dbClearCartUseCase"

function createDbClearCartUseCase(): DbClearCartUseCase {
    const dbClearCartUseCase = new DbClearCartUseCase(mongoCartRepository)

    return dbClearCartUseCase
}

export const dbClearCartUseCase = createDbClearCartUseCase()
