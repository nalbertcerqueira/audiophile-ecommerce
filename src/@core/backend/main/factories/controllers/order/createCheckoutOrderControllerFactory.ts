import { CreateCheckoutOrderController } from "@/@core/backend/presentation/controllers/order/createCheckoutOrderController"
import { dbCreateCheckoutOrderUseCase } from "../../usecases/order/dbCreateCheckoutOrderFactory"

function createCheckoutOrderCreationController(): CreateCheckoutOrderController {
    return new CreateCheckoutOrderController(dbCreateCheckoutOrderUseCase)
}

export const createCheckoutOrderController = createCheckoutOrderCreationController()
