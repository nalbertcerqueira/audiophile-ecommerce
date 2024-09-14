import { UserProps } from "@/@core/shared/entities/user/user"

export interface SignupData extends Omit<UserProps, "profileImg" | "phone"> {
    passwordConfirmation: string
}

export interface SignupGateway {
    signUp(data: SignupData): Promise<boolean>
}
