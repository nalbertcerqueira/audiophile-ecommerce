import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"
import { DbAddCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbAddCartItemUseCase"
import { MongoProductRepository } from "@/@core/backend/infra/db/mongo/repositories/product/mongoProductRepository"

export function createDbAddCartItemUseCase() {
    const mongoProductRepository = new MongoProductRepository()
    const dbAddCartItemUseCase = new DbAddCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository
    )

    return dbAddCartItemUseCase
}

export const dbAddCartItemUseCase = createDbAddCartItemUseCase()
