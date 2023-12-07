import { Cart, CartProduct } from "@/@core/shared/entities/cart/cart"

export interface AddCartItemRepository {
    addItem(userId: string, product: CartProduct): Promise<Cart>
}
