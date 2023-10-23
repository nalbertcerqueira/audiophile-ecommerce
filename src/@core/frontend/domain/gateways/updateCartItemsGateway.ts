import { CartProduct } from "@/@core/shared/entities/cart"

export interface UpdateCartItemsGateway {
    update(items: CartProduct[]): void
}
