import { ClearCartUseCase } from "../../usecases/cart/clearCartUseCase"
import { localStorageCartItemGateway } from "../gateways/cartGatewayFactory"

function createClearCartUseCase() {
    return new ClearCartUseCase(localStorageCartItemGateway)
}

export const clearCartUseCase = createClearCartUseCase()
