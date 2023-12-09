import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { DbRemoveCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbRemoveCartItemUseCase"
import { MongoProductRepository } from "@/@core/backend/infra/db/mongo/repositories/product/mongoProductRepository"

function createDbRemoveCartItemUseCase() {
    const mongoProductRepository = new MongoProductRepository()
    const dbRemoveCartItemUseCase = new DbRemoveCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository,
        mongoCartRepository
    )

    return dbRemoveCartItemUseCase
}

export const dbRemoveCartItemUseCase = createDbRemoveCartItemUseCase()
