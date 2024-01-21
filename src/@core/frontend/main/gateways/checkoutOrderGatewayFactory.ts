import { HttpCheckoutOrderGateway } from "../../infra/gateways/order/httpCheckoutOrderGateway"

function createHttpCheckoutOrderGateway(apiUrl: string): HttpCheckoutOrderGateway {
    return new HttpCheckoutOrderGateway(apiUrl)
}

export const httpCheckoutOrderGateway = createHttpCheckoutOrderGateway("/api/auth")
