import { HttpUserProfileGateway } from "../../infra/gateways/user/httpUserProfileGateway"

function createHttpUserProfileGateway(): HttpUserProfileGateway {
    return new HttpUserProfileGateway()
}

export const httpUserProfileGateway = createHttpUserProfileGateway()
