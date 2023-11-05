import { Cart } from "@/@core/shared/entities/cart/cart"

export interface AddCartItemGateway {
    addItem(itemId: string, quantity: number): Promise<Cart>
}
