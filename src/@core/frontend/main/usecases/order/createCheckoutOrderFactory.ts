import { HttpCheckoutOrderGateway } from "@/@core/frontend/infra/gateways/order/httpCheckoutOrderGateway"
import { CreateCheckoutOrderUseCase } from "@/@core/frontend/usecases/order/createCheckoutOrderUseCase"

function createCheckoutOrderCreationUseCase(apiUrl: string) {
    const httpCheckoutOrderGateway = new HttpCheckoutOrderGateway(apiUrl)

    return new CreateCheckoutOrderUseCase(httpCheckoutOrderGateway)
}

export const createCheckoutOrderUseCase = createCheckoutOrderCreationUseCase("/api/auth")
