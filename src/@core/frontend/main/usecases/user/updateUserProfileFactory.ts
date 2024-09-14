import { UpdateUserProfileUseCase } from "@/@core/frontend/usecases/user/profile/updateUserProfileUseCase"
import { httpUserProfileGateway } from "../../gateways/userProfileGatewayFactory"

function createUpdateUserProfileUseCase() {
    return new UpdateUserProfileUseCase(httpUserProfileGateway)
}

export const updateUserProfileUseCase = createUpdateUserProfileUseCase()
