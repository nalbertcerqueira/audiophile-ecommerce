import { mongoProductRepository } from "../../repositories/productRepositoryFactory"
import { DbGetProductsUseCase } from "../../../../domain/usecases/product/dbGetProductsUseCase"

function createDbGetProductsUseCase(): DbGetProductsUseCase {
    return new DbGetProductsUseCase(mongoProductRepository)
}

export const dbGetProductsUseCase = createDbGetProductsUseCase()
