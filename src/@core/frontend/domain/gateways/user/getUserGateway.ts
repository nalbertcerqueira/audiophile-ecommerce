import { UserProps } from "@/@core/shared/entities/user/user"

export type UserOrGuestToken =
    | (Pick<UserProps, "id"> & Partial<Pick<UserProps, "name" | "email">>)
    | string

export interface GetUserGateway {
    getUser(): Promise<UserOrGuestToken>
}
