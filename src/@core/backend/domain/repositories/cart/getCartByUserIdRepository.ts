import { Cart } from "@/@core/shared/entities/cart/cart"

export interface GetCartByUserIdRepository {
    getCartById(userId: string): Promise<Cart | null>
}
