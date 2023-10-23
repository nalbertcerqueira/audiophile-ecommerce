import { localStorageCartItemGateway } from "../gateways/cartGatewayFactory"
import { GetCartUseCase } from "../../usecases/cart/getCartUseCase"

export function createGetCartUseCase() {
    const getCartUseCase = new GetCartUseCase(localStorageCartItemGateway)
    return getCartUseCase
}

export const getCartUseCase = createGetCartUseCase()
