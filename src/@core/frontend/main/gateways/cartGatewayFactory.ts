import { HttpCartGateway } from "../../infra/gateways/cart/httpCartGateway"

function createHttpCartGateway(apiUrl: string) {
    return new HttpCartGateway(apiUrl)
}

export const httpCartGateway = createHttpCartGateway("/api/auth")
