import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserInfo } from "../../protocols"

export interface DeleteCartItemRepository {
    deleteItem(user: UserInfo, productId: string): Promise<Cart>
}
