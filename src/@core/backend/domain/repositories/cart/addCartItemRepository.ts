import { Cart } from "@/@core/shared/entities/cart/cart"
import { InsertionDetails, UserInfo } from "./protocols"

export interface AddCartItemRepository {
    addItem(user: UserInfo, operationInfo: InsertionDetails): Promise<Cart>
}
