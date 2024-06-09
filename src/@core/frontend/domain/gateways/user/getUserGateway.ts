import { UserProps } from "@/@core/shared/entities/user/user"

export interface GuestUser {
    id: string
    type: "guest"
}

export interface AuthenticatedUser extends Omit<UserProps, "password"> {
    id: string
    type: "authenticated" | "external"
}

export type UserOrGuestToken = AuthenticatedUser | GuestUser | string

export interface GetUserGateway {
    getUser(): Promise<UserOrGuestToken>
}
