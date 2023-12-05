import { ClearCartUseCase } from "../../../usecases/cart/clearCartUseCase"
import { localStorageCartGateway } from "../../gateways/cartGatewayFactory"

function createClearCartUseCase() {
    return new ClearCartUseCase(localStorageCartGateway)
}

export const clearCartUseCase = createClearCartUseCase()
