import { CartProduct } from "@/@core/shared/entities/cart"

export interface GetCartItemGateway {
    getAll(): Promise<CartProduct[]>
    getById(itemId: string): Promise<CartProduct | null>
}
