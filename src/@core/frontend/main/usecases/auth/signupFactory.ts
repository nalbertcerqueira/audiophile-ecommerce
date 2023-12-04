import { HttpUserGateway } from "@/@core/frontend/infra/gateways/user/httpUserGateway"
import { SignupUseCase } from "@/@core/frontend/usecases/auth/signupUseCase"

function createSignupUseCase(apiUrl: string): SignupUseCase {
    const httpUserGateway = new HttpUserGateway(apiUrl)
    const signupUseCase = new SignupUseCase(httpUserGateway)

    return signupUseCase
}

export const signupUseCase = createSignupUseCase("/api/signup")
