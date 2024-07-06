import { Cart } from "@/@core/shared/entities/cart/cart"
import { CartItem } from "@/@core/shared/entities/cart/cartItem"
import { UserInfo } from "./protocols"

export interface AddManyCartItemsRepository {
    addManyItems(user: UserInfo, items: CartItem[]): Promise<Cart | null>
}
