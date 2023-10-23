import { CartProduct } from "@/@core/shared/entities/cart"

export interface GetCartItemByIdRepository {
    getById(itemId?: string): Promise<CartProduct | null>
}
