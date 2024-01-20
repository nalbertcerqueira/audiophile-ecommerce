import { CreateCheckoutOrderUseCase } from "@/@core/backend/domain/usecases/order/dbCreateCheckoutOrderUseCase"
import { mongoCheckoutOrderRepository } from "../../repositories/checkoutOrderRepositoryFactory"

function createDbCreateCheckoutOrderUseCase() {
    return new CreateCheckoutOrderUseCase(mongoCheckoutOrderRepository)
}

export const dbCreateCheckoutOrderUseCase = createDbCreateCheckoutOrderUseCase()
