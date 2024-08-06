import { Cart } from "@/@core/shared/entities/cart/cart"
import { CartItem } from "@/@core/shared/entities/cart/cartItem"
import { UserInfo } from "../../protocols"

export interface AddCartItemRepository {
    addItem(user: UserInfo, item: CartItem): Promise<Cart>
}
