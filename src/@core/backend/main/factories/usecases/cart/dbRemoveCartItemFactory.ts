import { DbRemoveCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbRemoveCartItemUseCase"
import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"
import { MongoProductRepository } from "@/@core/backend/infra/db/mongo/repositories/product/mongoProductRepository"

function createDbRemoveCartItemUseCase() {
    const mongoProductRepository = new MongoProductRepository()
    const mongoCartRepository = new MongoCartRepository()
    const dbRemoveCartItemUseCase = new DbRemoveCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository,
        mongoCartRepository
    )

    return dbRemoveCartItemUseCase
}

export const dbRemoveCartItemUseCase = createDbRemoveCartItemUseCase()
