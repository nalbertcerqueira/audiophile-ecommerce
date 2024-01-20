import { ZodCreateCheckoutOrderValidator } from "@/@core/backend/infra/services/validators/order/zodCreateCheckoutOrderValidator"
import { CreateCheckoutOrderController } from "@/@core/backend/presentation/controllers/order/createCheckoutOrderController"
import { dbCreateCheckoutOrderUseCase } from "../../usecases/order/dbCreateCheckoutOrderFactory"

function createCheckoutOrderCreationController() {
    const zodCreateCheckoutOrderValidator = new ZodCreateCheckoutOrderValidator()

    return new CreateCheckoutOrderController(
        zodCreateCheckoutOrderValidator,
        dbCreateCheckoutOrderUseCase
    )
}

export const createCheckoutOrderController = createCheckoutOrderCreationController()
