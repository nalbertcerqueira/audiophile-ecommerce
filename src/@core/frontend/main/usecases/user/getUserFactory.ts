import { HttpUserGateway } from "@/@core/frontend/infra/gateways/user/httpUserGateway"
import { GetUserUseCase } from "@/@core/frontend/usecases/user/getUserUseCase"

function createGetUserUseCase() {
    const httpUserGateway = new HttpUserGateway()
    const getUserUseCase = new GetUserUseCase(httpUserGateway)

    return getUserUseCase
}

export const getUserUseCase = createGetUserUseCase()
