import { HttpUserProfileGateway } from "../../infra/gateways/user/httpUserProfileGateway"

function createHttpUserProfileGateway(apiUrl: string): HttpUserProfileGateway {
    return new HttpUserProfileGateway(apiUrl)
}

export const httpUserProfileGateway = createHttpUserProfileGateway("/api/auth")
