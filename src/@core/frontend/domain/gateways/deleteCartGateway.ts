import { Cart } from "@/@core/shared/entities/cart"

export interface DeleteCartGateway {
    deleteCart(): Promise<Cart>
}
