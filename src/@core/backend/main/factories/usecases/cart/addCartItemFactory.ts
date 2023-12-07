import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"
import { AddCartItemUseCase } from "@/@core/backend/domain/usecases/cart/addCartItemUseCase"
import { MongoProductRepository } from "@/@core/backend/infra/db/mongo/repositories/product/mongoProductRepository"

export function createAddCartItemUseCase() {
    const mongoProductRepository = new MongoProductRepository()
    const mongoCartRepository = new MongoCartRepository()
    const addCartItemUseCase = new AddCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository
    )

    return addCartItemUseCase
}

export const addCartItemUseCase = createAddCartItemUseCase()
