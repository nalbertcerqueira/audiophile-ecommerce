import { HttpAddressGateway } from "../../infra/gateways/address/httpAddressGateway"

function createHttpAddressGateway(apiUrl: string) {
    return new HttpAddressGateway(apiUrl)
}

export const httpAddressGateway = createHttpAddressGateway("/api/auth")
