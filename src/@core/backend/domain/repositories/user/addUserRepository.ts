import { User } from "@/@core/shared/entities/user/user"

export interface AddUserRepository {
    add(user: User): Promise<void>
}
