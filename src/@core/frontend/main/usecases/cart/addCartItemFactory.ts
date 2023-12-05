import { localStorageCartGateway } from "../../gateways/cartGatewayFactory"
import { AddCartItemUseCase } from "../../../usecases/cart/addCartItemUseCase"

function createAddCartItemUseCase() {
    return new AddCartItemUseCase(localStorageCartGateway)
}

export const addCartItemUseCase = createAddCartItemUseCase()
