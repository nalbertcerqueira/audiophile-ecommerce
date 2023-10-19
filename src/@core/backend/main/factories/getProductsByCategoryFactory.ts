import { MockProductRepository } from "../../infra/product/mockProductRepository"
import { GetProductsByCategoryUseCase } from "../../domain/usecases/product/getProductsByCategoryUseCase"

function createProductsByCateoryUseCase(): GetProductsByCategoryUseCase {
    const mockProductRepository = new MockProductRepository()
    const getProductsByCategoryUseCase = new GetProductsByCategoryUseCase(
        mockProductRepository
    )

    return getProductsByCategoryUseCase
}

export const getProductsByCategoryUseCase = createProductsByCateoryUseCase()
