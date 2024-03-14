import { UserProps } from "@/@core/shared/entities/user/user"

export interface SignupData extends Pick<UserProps, "name" | "email" | "password"> {
    passwordConfirmation: string
}

export interface CreateUserGateway {
    create(data: SignupData): Promise<boolean>
}
