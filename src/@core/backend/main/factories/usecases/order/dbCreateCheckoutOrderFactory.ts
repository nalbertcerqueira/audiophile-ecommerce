import { DbCreateCheckoutOrderUseCase } from "@/@core/backend/domain/usecases/order/dbCreateCheckoutOrderUseCase"
import { mongoCheckoutOrderRepository } from "../../repositories/checkoutOrderRepositoryFactory"
import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"

function createDbCreateCheckoutOrderUseCase(): DbCreateCheckoutOrderUseCase {
    return new DbCreateCheckoutOrderUseCase(
        mongoCartRepository,
        mongoCartRepository,
        mongoCheckoutOrderRepository
    )
}

export const dbCreateCheckoutOrderUseCase = createDbCreateCheckoutOrderUseCase()
