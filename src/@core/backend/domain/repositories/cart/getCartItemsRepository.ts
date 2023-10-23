import { CartProduct } from "@/@core/shared/entities/cart"

export interface GetCartItemsRepository {
    getAll(): Promise<CartProduct[]>
}
