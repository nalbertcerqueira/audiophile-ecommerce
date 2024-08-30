import { UserProps } from "@/@core/shared/entities/user/user"

export interface GuestUser {
    id: string
    type: "guest"
}

export interface DefaultUser extends Omit<UserProps, "password"> {
    id: string
    type: "authenticated" | "external"
}

export type UserOrGuestToken = DefaultUser | GuestUser | string

export interface GetUserProfileGateway {
    getProfile(): Promise<UserOrGuestToken>
}
