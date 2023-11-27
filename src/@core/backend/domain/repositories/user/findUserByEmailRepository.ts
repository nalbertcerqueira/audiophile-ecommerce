import { User } from "@/@core/shared/entities/user/user"

export interface FindUserByEmailRepository {
    findByEmail(email: string): Promise<User | null>
}
