import { UserProps } from "@/@core/shared/entities/user/user"
import { AuthenticationGateway } from "../../domain/gateways/auth/authenticationGateway"

type SigninInputDTO = Pick<UserProps, "email" | "password">

export class SigninUseCase {
    constructor(private readonly authenticationGateway: AuthenticationGateway) {}

    public async execute({ email, password }: SigninInputDTO): Promise<string | null> {
        const accessToken = await this.authenticationGateway.authenticateUser({
            email,
            password
        })
        return accessToken
    }
}
