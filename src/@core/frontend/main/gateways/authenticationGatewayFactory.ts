import { HttpAuthenticationGateway } from "../../infra/gateways/auth/httpAuthenticationGateway"

function createHttpAuthenticationGateway(apiUrl: string): HttpAuthenticationGateway {
    return new HttpAuthenticationGateway(apiUrl)
}

export const httpAuthenticationGateway = createHttpAuthenticationGateway("/api")
