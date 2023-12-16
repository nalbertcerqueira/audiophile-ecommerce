import { UserProps } from "@/@core/shared/entities/user/user"
import { AuthenticationGateway } from "../../domain/gateways/auth/authenticationGateway"

type SinginInputDTO = Pick<UserProps, "email" | "password">

export class SigninUseCase {
    constructor(private readonly authenticationGateway: AuthenticationGateway) {}

    public async execute({ email, password }: SinginInputDTO): Promise<string | null> {
        const sessionToken = await this.authenticationGateway.authenticateUser({
            email,
            password
        })
        return sessionToken
    }
}
