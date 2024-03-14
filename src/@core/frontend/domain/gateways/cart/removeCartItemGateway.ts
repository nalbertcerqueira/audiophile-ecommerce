import { Cart } from "@/@core/shared/entities/cart/cart"

export interface RemoveCartItemGateway {
    removeItem(productId: string, quantity: number): Promise<Cart>
}
