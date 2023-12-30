import { UserType } from "@/@core/shared/entities/user/user"

export interface ClearCartRepository {
    clearCartById(userId: string, userType: UserType): Promise<void>
}
