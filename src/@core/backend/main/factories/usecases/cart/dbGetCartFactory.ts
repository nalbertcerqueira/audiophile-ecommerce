import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { DbGetCartUseCase } from "@/@core/backend/domain/usecases/cart/dbGetCartUseCase"

function createDbGetCartUseCase() {
    const dbGetCartUseCase = new DbGetCartUseCase(mongoCartRepository)

    return dbGetCartUseCase
}

export const dbGetCartUseCase = createDbGetCartUseCase()
