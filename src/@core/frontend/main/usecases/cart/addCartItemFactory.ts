import { httpCartGateway } from "../../gateways/cartGatewayFactory"
import { AddCartItemUseCase } from "../../../usecases/cart/addCartItemUseCase"

function createAddCartItemUseCase(): AddCartItemUseCase {
    return new AddCartItemUseCase(httpCartGateway, httpCartGateway)
}

export const addCartItemUseCase = createAddCartItemUseCase()
