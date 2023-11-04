import { User } from "../../entities/user/user"

export interface FindUserByEmailRepository {
    findByEmail(email: string): Promise<User | null>
}
