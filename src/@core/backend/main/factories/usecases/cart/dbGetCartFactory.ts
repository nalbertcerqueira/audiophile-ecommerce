import { createMongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { DbGetCartUseCase } from "@/@core/backend/domain/usecases/cart/dbGetCartUseCase"

function createDbGetCartUseCase(): DbGetCartUseCase {
    const mongoCartRepository = createMongoCartRepository()

    return new DbGetCartUseCase(mongoCartRepository)
}

export const dbGetCartUseCase = createDbGetCartUseCase()
