import { httpCartGateway } from "../../gateways/cartGatewayFactory"
import { RemoveCartItemUseCase } from "../../../usecases/cart/removeCartItemUseCase"

function createRemoveCartItemUseCase(): RemoveCartItemUseCase {
    return new RemoveCartItemUseCase(httpCartGateway)
}

export const removeCartItemUseCase = createRemoveCartItemUseCase()
