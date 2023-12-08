import { DbGetProductByIdUseCase } from "@/@core/backend/domain/usecases/product/dbGetProductByIdUseCase"
import { MongoProductRepository } from "@/@core/backend/infra/db/mongo/repositories/product/mongoProductRepository"

function createDbGetProductByIdUseCase() {
    const mongoProductRepository = new MongoProductRepository()
    const dbGetProductByIdUseCase = new DbGetProductByIdUseCase(mongoProductRepository)

    return dbGetProductByIdUseCase
}

export const dbGetProductByIdUseCase = createDbGetProductByIdUseCase()
