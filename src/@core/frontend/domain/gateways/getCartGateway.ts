import { Cart } from "@/@core/shared/entities/cart"

export interface GetCartGateway {
    get(): Promise<Cart | null>
}
