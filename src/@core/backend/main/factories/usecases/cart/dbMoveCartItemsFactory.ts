import { DbMoveCartItemsUseCase } from "@/@core/backend/domain/usecases/cart/dbMoveCartItemsUseCase"
import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { mongoProductRepository } from "../../repositories/productRepositoryFactory"

function createDbMoveCartItemsUseCase() {
    return new DbMoveCartItemsUseCase(
        mongoProductRepository,
        mongoCartRepository,
        mongoCartRepository
    )
}

export const dbMoveCartItemsUseCase = createDbMoveCartItemsUseCase()
