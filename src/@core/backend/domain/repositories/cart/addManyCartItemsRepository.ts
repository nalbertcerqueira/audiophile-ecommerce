import { Cart } from "@/@core/shared/entities/cart/cart"
import { InsertionDetails, UserInfo } from "./protocols"

export interface AddManyCartItemsRepository {
    addManyItems(user: UserInfo, products: InsertionDetails[]): Promise<Cart | null>
}
