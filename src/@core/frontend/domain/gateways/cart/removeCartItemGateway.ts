import { Cart } from "@/@core/shared/entities/cart/cart"

export interface RemoveCartItemGateway {
    removeItem(itemId: string, quantity: number): Promise<Cart>
}
