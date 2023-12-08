import { Cart } from "@/@core/shared/entities/cart/cart"

export interface GetCartRepository {
    getCartById(userId: string): Promise<Cart | null>
}
