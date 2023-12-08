import { DbGetProductsUseCase } from "../../../../domain/usecases/product/dbGetProductsUseCase"
import { MongoProductRepository } from "../../../../infra/db/mongo/repositories/product/mongoProductRepository"

function createDbGetProductsUseCase(): DbGetProductsUseCase {
    const mongoProductsRepository = new MongoProductRepository()
    const getDbProductsUseCase = new DbGetProductsUseCase(mongoProductsRepository)

    return getDbProductsUseCase
}

export const getDbProductsUseCase = createDbGetProductsUseCase()
