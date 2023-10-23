import { localStorageCartItemGateway } from "../gateways/cartGatewayFactory"
import { AddCartItemUseCase } from "../../usecases/cart/addCartItemUseCase"

function createAddCartItemUseCase() {
    return new AddCartItemUseCase(localStorageCartItemGateway, localStorageCartItemGateway)
}

export const addCartItemUseCase = createAddCartItemUseCase()
