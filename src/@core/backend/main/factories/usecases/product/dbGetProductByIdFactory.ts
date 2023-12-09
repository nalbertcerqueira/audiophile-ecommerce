import { mongoProductRepository } from "../../repositories/productRepositoryFactory"
import { DbGetProductByIdUseCase } from "@/@core/backend/domain/usecases/product/dbGetProductByIdUseCase"

function createDbGetProductByIdUseCase() {
    return new DbGetProductByIdUseCase(mongoProductRepository)
}

export const dbGetProductByIdUseCase = createDbGetProductByIdUseCase()
