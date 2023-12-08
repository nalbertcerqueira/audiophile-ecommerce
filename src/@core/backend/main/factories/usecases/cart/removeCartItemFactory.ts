import { RemoveCartItemUseCase } from "@/@core/backend/domain/usecases/cart/removeCartItemUseCase"
import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"
import { MongoProductRepository } from "@/@core/backend/infra/db/mongo/repositories/product/mongoProductRepository"

function createRemoveCartItemUseCase() {
    const mongoProductRepository = new MongoProductRepository()
    const mongoCartRepository = new MongoCartRepository()
    const removeCartItemUseCase = new RemoveCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository,
        mongoCartRepository
    )

    return removeCartItemUseCase
}

export const removeCartItemUseCase = createRemoveCartItemUseCase()
