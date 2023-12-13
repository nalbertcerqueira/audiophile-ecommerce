import { httpCartGateway } from "../../gateways/cartGatewayFactory"
import { AddCartItemUseCase } from "../../../usecases/cart/addCartItemUseCase"

function createAddCartItemUseCase() {
    return new AddCartItemUseCase(httpCartGateway)
}

export const addCartItemUseCase = createAddCartItemUseCase()
