import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { UserDetails } from "../protocols"

export interface GetCartItemRepository {
    getItem(userDetails: UserDetails, productId: string): Promise<CartProduct | null>
}
