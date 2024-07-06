import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { UserInfo } from "./protocols"

export interface GetCartItemRepository {
    getItem(user: UserInfo, productId: string): Promise<CartProduct | null>
}
