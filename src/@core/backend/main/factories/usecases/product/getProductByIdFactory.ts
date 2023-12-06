import { GetProductByIdUseCase } from "@/@core/backend/domain/usecases/product/getProductByIdUseCase"
import { MongoProductRepository } from "@/@core/backend/infra/db/mongo/repositories/product/mongoProductRepository"

function createGetProductByIdUseCase() {
    const mongoProductRepository = new MongoProductRepository()
    const getProductByIdUseCase = new GetProductByIdUseCase(mongoProductRepository)

    return getProductByIdUseCase
}

export const getProductByIdUseCase = createGetProductByIdUseCase()
