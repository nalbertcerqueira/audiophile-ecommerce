import { HttpCartGateway } from "../../infra/gateways/cart/httpCartGateway"

function createHttpCartGateway(apiUrl: string): HttpCartGateway {
    return new HttpCartGateway(apiUrl)
}

export const httpCartGateway = createHttpCartGateway("/api/auth")
