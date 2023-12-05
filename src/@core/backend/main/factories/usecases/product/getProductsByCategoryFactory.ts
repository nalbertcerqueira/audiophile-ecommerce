import { MongoProductRepository } from "../../../../infra/db/mongo/repositories/product/mongoProductRepository"
import { GetProductsByCategoryUseCase } from "../../../../domain/usecases/product/getProductsByCategoryUseCase"

function createProductsByCateoryUseCase(): GetProductsByCategoryUseCase {
    const mongoProductRepository = new MongoProductRepository()
    const getProductsByCategoryUseCase = new GetProductsByCategoryUseCase(
        mongoProductRepository
    )

    return getProductsByCategoryUseCase
}

export const getProductsByCategoryUseCase = createProductsByCateoryUseCase()
