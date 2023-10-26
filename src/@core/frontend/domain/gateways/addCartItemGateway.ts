import { Cart } from "@/@core/shared/entities/cart"

export interface AddCartItemGateway {
    addItem(itemId: string, quantity: number): Promise<Cart>
}
