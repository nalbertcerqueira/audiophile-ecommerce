import { UserProps } from "@/@core/shared/entities/user/user"

export type UserWithoutId = Omit<UserProps, "id">

export interface AddUserRepository {
    add(userProps: UserWithoutId): Promise<void>
}
