import { MongoProductRepository } from "../../../../infra/db/mongo/repositories/product/mongoProductRepository"
import { DbGetProductsByCategoryUseCase } from "../../../../domain/usecases/product/dbGetProductsByCategoryUseCase"

function createDbProductsByCateoryUseCase(): DbGetProductsByCategoryUseCase {
    const mongoProductRepository = new MongoProductRepository()

    return new DbGetProductsByCategoryUseCase(mongoProductRepository)
}

export const dbGetProductsByCategoryUseCase = createDbProductsByCateoryUseCase()
