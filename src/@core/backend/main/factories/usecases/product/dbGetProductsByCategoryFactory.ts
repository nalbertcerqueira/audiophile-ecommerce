import { mongoProductRepository } from "../../repositories/productRepositoryFactory"
import { DbGetProductsByCategoryUseCase } from "../../../../domain/usecases/product/dbGetProductsByCategoryUseCase"

function createDbProductsByCategoryUseCase(): DbGetProductsByCategoryUseCase {
    return new DbGetProductsByCategoryUseCase(mongoProductRepository)
}

export const dbGetProductsByCategoryUseCase = createDbProductsByCategoryUseCase()
