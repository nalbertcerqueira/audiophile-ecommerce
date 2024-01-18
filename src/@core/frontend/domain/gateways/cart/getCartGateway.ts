import { Cart } from "@/@core/shared/entities/cart/cart"

export interface GetCartGateway {
    get(): Promise<Cart>
}
