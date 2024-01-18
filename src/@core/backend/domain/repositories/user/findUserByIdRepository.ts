import { User } from "@/@core/shared/entities/user/user"

export interface FindUserByIdRepository {
    findById(userId: string): Promise<User | null>
}
