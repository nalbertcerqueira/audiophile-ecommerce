import { UserProps } from "@/@core/shared/entities/user/user"
import { SigninGateway } from "../../domain/gateways/auth/signinGateway"

type SigninInputDTO = Pick<UserProps, "email" | "password">

export class SigninUseCase {
    constructor(private readonly signinGateway: SigninGateway) {}

    public async execute({ email, password }: SigninInputDTO): Promise<string | null> {
        const accessToken = await this.signinGateway.signIn({
            email,
            password
        })
        return accessToken
    }
}
