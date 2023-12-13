import { UserProps } from "@/@core/shared/entities/user/user"

export interface GetUserGateway {
    getUser(): Promise<Pick<UserProps, "id" | "name" | "email"> | null>
}
