import { GetOrderTaxesUseCase } from "@/@core/frontend/usecases/order/getOrderTaxesUseCase"
import { httpCheckoutOrderGateway } from "../../gateways/checkoutOrderGatewayFactory"

function createGetOrderTaxesUseCase() {
    return new GetOrderTaxesUseCase(httpCheckoutOrderGateway)
}

export const getOrderTaxesUseCase = createGetOrderTaxesUseCase()
