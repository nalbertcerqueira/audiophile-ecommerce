import { UserType } from "@/@core/shared/entities/cart/cart"

export interface ClearCartRepository {
    clearCartById(userId: string, userType: UserType): Promise<void>
}
