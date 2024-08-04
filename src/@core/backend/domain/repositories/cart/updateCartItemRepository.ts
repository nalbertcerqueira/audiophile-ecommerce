import { Cart } from "@/@core/shared/entities/cart/cart"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { UserInfo } from "./protocols"
import { Optional } from "@/@core/shared/entities/protocols"

export interface UpdateCartItemRepository {
    updateItem(
        user: UserInfo,
        item: Optional<CartProduct, keyof Omit<CartProduct, "productId">>
    ): Promise<Cart>
}
