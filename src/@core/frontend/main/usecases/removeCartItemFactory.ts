import { localStorageCartGateway } from "../gateways/cartGatewayFactory"
import { RemoveCartItemUseCase } from "../../usecases/cart/removeCartItemUseCase"

function createRemoveCartItemUseCase() {
    return new RemoveCartItemUseCase(localStorageCartGateway)
}

export const removeCartItemUseCase = createRemoveCartItemUseCase()
