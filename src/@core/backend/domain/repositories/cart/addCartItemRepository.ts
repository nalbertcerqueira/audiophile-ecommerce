import { Cart } from "@/@core/shared/entities/cart/cart"
import { InsertionDetails } from "./protocols"
import { UserInfo } from "../../usecases/protocols"

export interface AddCartItemRepository {
    addItem(user: UserInfo, operationInfo: InsertionDetails): Promise<Cart>
}
