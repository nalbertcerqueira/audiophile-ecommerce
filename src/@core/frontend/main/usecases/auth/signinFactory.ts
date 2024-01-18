import { HttpAuthenticationGateway } from "@/@core/frontend/infra/gateways/auth/httpAuthenticationGateway"
import { SigninUseCase } from "@/@core/frontend/usecases/auth/signinUseCase"

function createSigninUseCase(apiUrl: string): SigninUseCase {
    const authenticationGateway = new HttpAuthenticationGateway(apiUrl)
    const signinUseCase = new SigninUseCase(authenticationGateway)

    return signinUseCase
}

export const signinUseCase = createSigninUseCase("/api")
