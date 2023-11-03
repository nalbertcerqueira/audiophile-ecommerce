import { User } from "../../entities/user"

export interface FindUserByEmailRepository {
    findByEmail(email: string): Promise<User | null>
}
