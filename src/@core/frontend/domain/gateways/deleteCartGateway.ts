import { Cart } from "@/@core/shared/entities/cart/cart"

export interface DeleteCartGateway {
    deleteCart(): Promise<Cart>
}
