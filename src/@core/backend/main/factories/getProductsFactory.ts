import { GetProductsUseCase } from "../../domain/usecases/product/getProductsUseCase"
import { MockProductRepository } from "../../infra/product/mockProductRepository"

function getProductsFactory(): GetProductsUseCase {
    const getProductsRepository = new MockProductRepository()
    const getProductsUseCase = new GetProductsUseCase(getProductsRepository)

    return getProductsUseCase
}

export const getProductsUseCase = getProductsFactory()
