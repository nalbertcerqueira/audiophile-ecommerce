import { DbMoveCartItemsUseCase } from "@/@core/backend/domain/usecases/cart/dbMoveCartItemsUseCase"
import { mongoProductRepository } from "../../repositories/productRepositoryFactory"
import { createMongoCartRepository } from "../../repositories/cartRepositoryFactory"

function createDbMoveCartItemsUseCase() {
    const mongoCartRepository = createMongoCartRepository()

    return new DbMoveCartItemsUseCase(
        mongoProductRepository,
        mongoCartRepository,
        mongoCartRepository
    )
}

export const dbMoveCartItemsUseCase = createDbMoveCartItemsUseCase()
