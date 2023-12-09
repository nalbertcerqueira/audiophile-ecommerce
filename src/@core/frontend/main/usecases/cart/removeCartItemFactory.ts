import { httpCartGateway, localStorageCartGateway } from "../../gateways/cartGatewayFactory"
import { RemoveCartItemUseCase } from "../../../usecases/cart/removeCartItemUseCase"

function createLocalStorageRemoveCartItemUseCase() {
    return new RemoveCartItemUseCase(localStorageCartGateway)
}

function createHttpRemoveCartItemUseCase() {
    return new RemoveCartItemUseCase(httpCartGateway)
}

export const localStorageRemoveCartItemUseCase = createLocalStorageRemoveCartItemUseCase()

export const httpRemoveCartItemUseCase = createHttpRemoveCartItemUseCase()
