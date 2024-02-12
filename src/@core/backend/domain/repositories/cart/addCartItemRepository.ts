import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserDetails } from "../protocols"
import { InsertionDetails } from "./protocols"

export interface AddCartItemRepository {
    addItem(userDetails: UserDetails, operationInfo: InsertionDetails): Promise<Cart>
}
