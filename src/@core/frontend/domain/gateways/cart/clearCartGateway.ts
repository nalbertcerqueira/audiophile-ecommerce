import { Cart } from "@/@core/shared/entities/cart/cart"

export interface ClearCartGateway {
    clearCart(): Promise<Cart>
}
