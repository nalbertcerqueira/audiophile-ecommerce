import { UserProps } from "@/@core/shared/entities/user/user"

export interface FindUserByIdRepository {
    findById(id: string): Promise<Omit<UserProps, "password"> | null>
}
