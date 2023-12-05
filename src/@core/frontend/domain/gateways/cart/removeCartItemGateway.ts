import { Cart } from "@/@core/shared/entities/cart/cart"

export interface RemoveCartItemGateway {
    removeItem(itemId: string): Promise<Cart>
}
