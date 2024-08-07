import { Cart } from "@/@core/shared/entities/cart/cart"
import { CartItem } from "@/@core/shared/entities/cart/cartItem"
import { UserInfo } from "../../protocols"

export interface AddCartItemsRepository {
    addItems(user: UserInfo, items: CartItem[]): Promise<Cart>
}
