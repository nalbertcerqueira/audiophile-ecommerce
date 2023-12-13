import { UserProps } from "@/@core/shared/entities/user/user"

export interface GuestUser extends Pick<UserProps, "id"> {
    type: "guest"
}

export interface AuthenticatedUser extends Pick<UserProps, "id" | "name" | "email"> {
    type: "authenticated"
}

export type UserOrGuestToken = AuthenticatedUser | GuestUser | string

export interface GetUserGateway {
    getUser(): Promise<UserOrGuestToken>
}
