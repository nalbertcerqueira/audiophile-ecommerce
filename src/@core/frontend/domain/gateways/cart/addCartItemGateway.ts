import { Cart } from "@/@core/shared/entities/cart/cart"

export interface AddCartItemGateway {
    addItem(productId: string, quantity: number): Promise<Cart>
}
