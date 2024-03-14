import { UserProps } from "@/@core/shared/entities/user/user"

export interface UserWithId extends UserProps {
    readonly id: string
}

export interface FindUserByEmailRepository {
    findByEmail(email: string): Promise<UserWithId | null>
}
