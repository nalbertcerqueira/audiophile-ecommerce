import { UserProps } from "@/@core/shared/entities/user/user"
import { SignupGateway } from "../../domain/gateways/auth/signupGateway"

interface SignupInputDTO extends Omit<UserProps, "profileImg" | "phone"> {
    passwordConfirmation: string
}

export class SignupUseCase {
    constructor(private readonly signupGateway: SignupGateway) {}

    public async execute(signupData: SignupInputDTO): Promise<boolean> {
        const isUserCreated = await this.signupGateway.signUp(signupData)

        return isUserCreated
    }
}
