import { AuthenticationGateway } from "../../domain/gateways/auth/authenticationGateway"

interface SinginInputDTO {
    email: string
    password: string
}

export class SigninUseCase {
    constructor(private readonly authenticationGateway: AuthenticationGateway) {}

    public async execute({ email, password }: SinginInputDTO): Promise<string | null> {
        const accessToken = await this.authenticationGateway.authenticateUser({
            email,
            password
        })
        return accessToken
    }
}
