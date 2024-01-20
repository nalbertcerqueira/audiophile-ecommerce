import { CreateCheckoutOrderUseCase } from "@/@core/backend/domain/usecases/order/dbCreateCheckoutOrderUseCase"
import { mongoCheckoutOrderRepository } from "../../repositories/checkoutOrderRepositoryFactory"
import { mongoCartRepository } from "../../repositories/cartRepositoryFactory"

function createDbCreateCheckoutOrderUseCase(): CreateCheckoutOrderUseCase {
    return new CreateCheckoutOrderUseCase(
        mongoCartRepository,
        mongoCartRepository,
        mongoCheckoutOrderRepository
    )
}

export const dbCreateCheckoutOrderUseCase = createDbCreateCheckoutOrderUseCase()
