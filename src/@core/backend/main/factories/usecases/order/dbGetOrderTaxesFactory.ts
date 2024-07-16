import { DbGetOrderTaxesUseCase } from "@/@core/backend/domain/usecases/order/dbGetOrderTaxesUseCase"
import { createMongoCartRepository } from "../../repositories/cartRepositoryFactory"

function createDbGetOrderTaxesUseCase(): DbGetOrderTaxesUseCase {
    const mongoCartRepository = createMongoCartRepository()

    return new DbGetOrderTaxesUseCase(mongoCartRepository)
}

export const dbGetOrderTaxesUseCase = createDbGetOrderTaxesUseCase()
