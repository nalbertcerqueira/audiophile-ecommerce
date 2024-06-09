import { UserProps } from "@/@core/shared/entities/user/user"

export interface SignupData extends Omit<UserProps, "images"> {
    passwordConfirmation: string
}

export interface CreateUserGateway {
    create(data: SignupData): Promise<boolean>
}
