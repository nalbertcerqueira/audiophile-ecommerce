import { httpCartGateway, localStorageCartGateway } from "../../gateways/cartGatewayFactory"
import { AddCartItemUseCase } from "../../../usecases/cart/addCartItemUseCase"

function createLocalStorageAddCartItemUseCase() {
    return new AddCartItemUseCase(localStorageCartGateway)
}

function createHttpAddCartItemUseCase() {
    return new AddCartItemUseCase(httpCartGateway)
}

export const localStorageAddCartItemUseCase = createLocalStorageAddCartItemUseCase()

export const httpAddCartItemUseCase = createHttpAddCartItemUseCase()
