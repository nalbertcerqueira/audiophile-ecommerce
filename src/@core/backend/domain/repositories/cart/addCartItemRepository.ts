import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserType } from "@/@core/shared/entities/user/user"
import { InsertionDetails } from "./protocols"

export interface AddCartItemRepository {
    addItem(userId: string, userType: UserType, operationInfo: InsertionDetails): Promise<Cart>
}
