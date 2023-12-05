import { localStorageCartGateway } from "../../gateways/cartGatewayFactory"
import { GetCartUseCase } from "../../../usecases/cart/getCartUseCase"

export function createGetCartUseCase() {
    const getCartUseCase = new GetCartUseCase(localStorageCartGateway)
    return getCartUseCase
}

export const getCartUseCase = createGetCartUseCase()
