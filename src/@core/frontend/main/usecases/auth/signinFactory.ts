import { httpAuthenticationGateway } from "../../gateways/authenticationGatewayFactory"
import { SigninUseCase } from "@/@core/frontend/usecases/auth/signinUseCase"

function createSigninUseCase(): SigninUseCase {
    return new SigninUseCase(httpAuthenticationGateway)
}

export const signinUseCase = createSigninUseCase()
