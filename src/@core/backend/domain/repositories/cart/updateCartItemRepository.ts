import { Cart } from "@/@core/shared/entities/cart/cart"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { UserInfo } from "../../protocols"

export interface UpdateCartItemRepository {
    updateItem(
        user: UserInfo,
        item: Pick<CartProduct, "productId" | "quantity">
    ): Promise<Cart | null>
}
