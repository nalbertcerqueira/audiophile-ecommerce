import { ClearCartUseCase } from "../../../usecases/cart/clearCartUseCase"
import { httpCartGateway } from "../../gateways/cartGatewayFactory"

function createClearCartUseCase() {
    return new ClearCartUseCase(httpCartGateway)
}

export const clearCartUseCase = createClearCartUseCase()
