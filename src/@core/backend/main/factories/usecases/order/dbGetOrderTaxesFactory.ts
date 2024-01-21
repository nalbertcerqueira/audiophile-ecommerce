import { DbGetOrderTaxesUseCase } from "@/@core/backend/domain/usecases/order/dbGetOrderTaxesUseCase"
import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"

function createDbGetOrderTaxesUseCase(): DbGetOrderTaxesUseCase {
    return new DbGetOrderTaxesUseCase(mongoCartRepository)
}

export const dbGetOrderTaxesUseCase = createDbGetOrderTaxesUseCase()
