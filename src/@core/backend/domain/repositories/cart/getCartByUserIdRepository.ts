import { Cart } from "@/@core/shared/entities/cart/cart"

export interface GetCartByUserIdRepository {
    getById(userId: string): Promise<Cart | null>
}
