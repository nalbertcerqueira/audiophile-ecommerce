import { HttpUserGateway } from "@/@core/frontend/infra/gateways/user/httpUserGateway"
import { GetUserUseCase } from "@/@core/frontend/usecases/user/getUserUseCase"

function createGetUserUseCase() {
    const httpUserGateway = new HttpUserGateway()
    const getUserGateway = new GetUserUseCase(httpUserGateway)

    return getUserGateway
}

export const getUserGateway = createGetUserUseCase()
