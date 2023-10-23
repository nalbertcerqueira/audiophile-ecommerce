import { localStorageCartItemGateway } from "../gateways/cartGatewayFactory"
import { RemoveCartItemUseCase } from "../../usecases/cart/removeCartItemUseCase"

function createRemoveCartItemUseCase() {
    return new RemoveCartItemUseCase(localStorageCartItemGateway, localStorageCartItemGateway)
}

export const removeCartItemUseCase = createRemoveCartItemUseCase()
