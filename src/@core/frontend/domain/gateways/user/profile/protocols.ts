import { UserProps } from "@/@core/shared/entities/user/user"

export interface GuestUser {
    id: string
    type: "guest"
    token?: string
}

export interface DefaultUser extends Omit<UserProps, "password"> {
    id: string
    type: "authenticated" | "external"
}

export type UserOrGuest = DefaultUser | GuestUser
