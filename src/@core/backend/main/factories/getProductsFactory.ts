import { GetProductsUseCase } from "../../domain/usecases/product/getProductsUseCase"
import { MockProductRepository } from "../../infra/product/mockProductRepository"

function createGetProductsUseCase(): GetProductsUseCase {
    const getProductsRepository = new MockProductRepository()
    const getProductsUseCase = new GetProductsUseCase(getProductsRepository)

    return getProductsUseCase
}

export const getProductsUseCase = createGetProductsUseCase()
