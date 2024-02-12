import { DbMoveCartItemsUseCase } from "@/@core/backend/domain/usecases/cart/dbMoveCartItemsUseCase"
import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"

function createDbMoveCartItemsUseCase() {
    return new DbMoveCartItemsUseCase(mongoCartRepository, mongoCartRepository)
}

export const dbMoveCartItemsUseCase = createDbMoveCartItemsUseCase()
