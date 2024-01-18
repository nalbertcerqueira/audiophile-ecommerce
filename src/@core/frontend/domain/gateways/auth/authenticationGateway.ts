import { UserProps } from "@/@core/shared/entities/user/user"

export type AuthData = Pick<UserProps, "email" | "password">

export interface AuthenticationGateway {
    authenticateUser(authData: AuthData): Promise<string | null>
}
