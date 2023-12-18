import { UserProps } from "@/@core/shared/entities/user/user"

export interface GuestUser {
    id: string
    type: "guest"
}

export interface AuthenticatedUser extends Pick<UserProps, "name" | "email"> {
    id: string
    type: "authenticated"
}

export type UserOrGuestToken = AuthenticatedUser | GuestUser | string

export interface GetUserGateway {
    getUser(): Promise<UserOrGuestToken>
}
