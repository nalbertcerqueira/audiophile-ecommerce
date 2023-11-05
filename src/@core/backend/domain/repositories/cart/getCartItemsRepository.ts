import { CartProduct } from "@/@core/shared/entities/cart/cart"

export interface GetCartItemsRepository {
    getAll(): Promise<CartProduct[]>
}
