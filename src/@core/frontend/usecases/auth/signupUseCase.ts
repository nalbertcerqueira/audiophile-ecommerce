import { UserProps } from "@/@core/shared/entities/user/user"
import { CreateUserGateway } from "../../domain/gateways/user/createUserGateway"

interface SignupInputDTO extends Pick<UserProps, "name" | "email" | "password"> {
    passwordConfirmation: string
}

export class SignupUseCase {
    constructor(private readonly createUserGateway: CreateUserGateway) {}

    public async execute(signupData: SignupInputDTO): Promise<boolean> {
        const isUserCreated = await this.createUserGateway.create(signupData)

        return isUserCreated
    }
}
