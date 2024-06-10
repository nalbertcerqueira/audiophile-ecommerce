import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { UserInfo } from "./protocols"

export interface GetCartItemRepository {
    getItem(user: UserInfo, productId: string): Promise<CartProduct | null>
}
