import { CreateCheckoutOrderUseCase } from "@/@core/frontend/usecases/order/createCheckoutOrderUseCase"
import { httpCheckoutOrderGateway } from "../../gateways/checkoutOrderGatewayFactory"

function createCheckoutOrderCreationUseCase() {
    return new CreateCheckoutOrderUseCase(httpCheckoutOrderGateway)
}

export const createCheckoutOrderUseCase = createCheckoutOrderCreationUseCase()
