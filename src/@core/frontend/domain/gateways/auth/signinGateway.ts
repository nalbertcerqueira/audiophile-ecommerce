import { UserProps } from "@/@core/shared/entities/user/user"

export type AuthData = Pick<UserProps, "email" | "password">

export interface SigninGateway {
    signIn(data: AuthData): Promise<string | null>
}
