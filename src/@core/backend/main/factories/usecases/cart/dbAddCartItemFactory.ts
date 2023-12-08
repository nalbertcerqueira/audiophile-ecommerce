import { MongoCartRepository } from "@/@core/backend/infra/db/mongo/repositories/cart/mongoCartRepository"
import { DbAddCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbAddCartItemUseCase"
import { MongoProductRepository } from "@/@core/backend/infra/db/mongo/repositories/product/mongoProductRepository"

export function createDbAddCartItemUseCase() {
    const mongoProductRepository = new MongoProductRepository()
    const mongoCartRepository = new MongoCartRepository()
    const dbAddCartItemUseCase = new DbAddCartItemUseCase(
        mongoProductRepository,
        mongoCartRepository
    )

    return dbAddCartItemUseCase
}

export const dbAddCartItemUseCase = createDbAddCartItemUseCase()
