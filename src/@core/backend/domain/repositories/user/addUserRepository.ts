import { UserProps, User } from "../../entities/user"

export type UserWithoutId = Omit<UserProps, "id">

export interface AddUserRepository {
    add(userProps: UserWithoutId): Promise<User>
}
