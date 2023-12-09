import { ClearCartUseCase } from "../../../usecases/cart/clearCartUseCase"
import { httpCartGateway, localStorageCartGateway } from "../../gateways/cartGatewayFactory"

function createLocalStorageClearCartUseCase() {
    return new ClearCartUseCase(localStorageCartGateway)
}

function createHttpClearCartUseCase() {
    return new ClearCartUseCase(httpCartGateway)
}

export const localStorageClearCartUseCase = createLocalStorageClearCartUseCase()

export const httpClearCartUseCase = createHttpClearCartUseCase()
