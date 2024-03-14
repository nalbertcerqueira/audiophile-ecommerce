import { UserProps } from "@/@core/shared/entities/user/user"

export interface BasicUserInfo extends Pick<UserProps, "name" | "email" | "images"> {
    readonly id: string
}

export interface FindUserByIdRepository {
    findById(id: string): Promise<BasicUserInfo | null>
}
