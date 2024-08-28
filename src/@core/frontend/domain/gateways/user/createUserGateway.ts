import { UserProps } from "@/@core/shared/entities/user/user"

export interface SignupData extends Omit<UserProps, "profileImg" | "phone"> {
    passwordConfirmation: string
}

export interface CreateUserGateway {
    create(data: SignupData): Promise<boolean>
}
