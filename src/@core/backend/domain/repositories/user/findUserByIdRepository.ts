import { UserProps } from "@/@core/shared/entities/user/user"

export interface BasicUserInfo extends Omit<UserProps, "password"> {
    readonly id: string
}

export interface FindUserByIdRepository {
    findById(id: string): Promise<BasicUserInfo | null>
}
