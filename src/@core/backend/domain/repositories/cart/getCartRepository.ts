import { Cart, UserType } from "@/@core/shared/entities/cart/cart"

export interface GetCartRepository {
    getCartById(userId: string, userType: UserType): Promise<Cart | null>
}
