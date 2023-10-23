import { GetProductsUseCase } from "../../../domain/usecases/product/getProductsUseCase"
import { MongoProductRepository } from "../../../infra/db/mongo/repositories/product/mongoProductRepository"

function createGetProductsUseCase(): GetProductsUseCase {
    const mongoProductsRepository = new MongoProductRepository()
    const getProductsUseCase = new GetProductsUseCase(mongoProductsRepository)

    return getProductsUseCase
}

export const getProductsUseCase = createGetProductsUseCase()
