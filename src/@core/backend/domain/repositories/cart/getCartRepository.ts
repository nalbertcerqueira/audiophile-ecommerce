import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserType } from "@/@core/shared/entities/user/user"

export interface GetCartRepository {
    getCartById(userId: string, userType: UserType): Promise<Cart | null>
}
