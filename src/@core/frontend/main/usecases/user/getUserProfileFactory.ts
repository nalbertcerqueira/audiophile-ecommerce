import { httpUserProfileGateway } from "../../gateways/userProfileGatewayFactory"
import { GetUserUseProfileUseCase } from "@/@core/frontend/usecases/user/profile/getUserProfileUseCase"

function createGetUserProfileUseCase(): GetUserUseProfileUseCase {
    return new GetUserUseProfileUseCase(httpUserProfileGateway)
}

export const getUserProfileUseCase = createGetUserProfileUseCase()
