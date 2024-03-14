import { httpCartGateway } from "../../gateways/cartGatewayFactory"
import { GetCartUseCase } from "../../../usecases/cart/getCartUseCase"

function createGetCartUseCase(): GetCartUseCase {
    return new GetCartUseCase(httpCartGateway)
}

export const getCartUseCase = createGetCartUseCase()
