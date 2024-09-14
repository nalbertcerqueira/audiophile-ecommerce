import { httpAuthenticationGateway } from "../../gateways/authenticationGatewayFactory"
import { SignupUseCase } from "@/@core/frontend/usecases/auth/signupUseCase"

function createSignupUseCase(): SignupUseCase {
    return new SignupUseCase(httpAuthenticationGateway)
}

export const signupUseCase = createSignupUseCase()
