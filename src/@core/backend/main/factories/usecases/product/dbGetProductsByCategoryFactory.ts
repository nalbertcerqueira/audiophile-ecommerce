import { mongoProductRepository } from "../../repositories/productRepositoryFactory"
import { DbGetProductsByCategoryUseCase } from "../../../../domain/usecases/product/dbGetProductsByCategoryUseCase"

function createDbProductsByCateoryUseCase(): DbGetProductsByCategoryUseCase {
    return new DbGetProductsByCategoryUseCase(mongoProductRepository)
}

export const dbGetProductsByCategoryUseCase = createDbProductsByCateoryUseCase()
