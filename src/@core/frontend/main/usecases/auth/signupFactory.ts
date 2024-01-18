import { HttpUserGateway } from "@/@core/frontend/infra/gateways/user/httpUserGateway"
import { SignupUseCase } from "@/@core/frontend/usecases/auth/signupUseCase"

function createSignupUseCase(): SignupUseCase {
    const httpUserGateway = new HttpUserGateway()
    const signupUseCase = new SignupUseCase(httpUserGateway)

    return signupUseCase
}

export const signupUseCase = createSignupUseCase()
