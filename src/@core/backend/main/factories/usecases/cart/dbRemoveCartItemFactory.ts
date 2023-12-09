import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { mongoProductRepository } from "../../repositories/productRepositoryFactory"
import { DbRemoveCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbRemoveCartItemUseCase"

function createDbRemoveCartItemUseCase() {
    const dbRemoveCartItemUseCase = new DbRemoveCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository,
        mongoCartRepository
    )

    return dbRemoveCartItemUseCase
}

export const dbRemoveCartItemUseCase = createDbRemoveCartItemUseCase()
