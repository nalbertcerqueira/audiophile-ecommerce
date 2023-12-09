import { httpCartGateway, localStorageCartGateway } from "../../gateways/cartGatewayFactory"
import { GetCartUseCase } from "../../../usecases/cart/getCartUseCase"

function createLocalStorageGetCartUseCase() {
    return new GetCartUseCase(localStorageCartGateway)
}

function createHttpGetCartUseCase() {
    return new GetCartUseCase(httpCartGateway)
}

export const localStorageGetCartUseCase = createLocalStorageGetCartUseCase()

export const httpGetCartUseCase = createHttpGetCartUseCase()
