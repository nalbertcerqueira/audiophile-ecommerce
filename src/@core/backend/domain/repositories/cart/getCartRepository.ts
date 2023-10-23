import { CartProps } from "@/@core/shared/entities/cart"

export interface GetCartRepository {
    getCart(): Promise<CartProps>
}
