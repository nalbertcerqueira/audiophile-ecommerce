import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserDetails } from "../protocols"

export interface GetCartRepository {
    getCartById(userDetails: UserDetails): Promise<Cart | null>
}
