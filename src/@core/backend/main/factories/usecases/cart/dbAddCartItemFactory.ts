import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { mongoProductRepository } from "../../repositories/productRepositoryFactory"
import { DbAddCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbAddCartItemUseCase"

function createDbAddCartItemUseCase() {
    const dbAddCartItemUseCase = new DbAddCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository
    )

    return dbAddCartItemUseCase
}

export const dbAddCartItemUseCase = createDbAddCartItemUseCase()
