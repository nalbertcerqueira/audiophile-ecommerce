import { UserProps } from "@/@core/shared/entities/user/user"

export interface UserData extends Pick<UserProps, "name" | "email" | "password"> {
    passwordConfirmation: string
}

export interface CreateUserGateway {
    create(data: UserData): Promise<boolean>
}
