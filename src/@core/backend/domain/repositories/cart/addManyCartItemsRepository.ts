import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserDetails } from "../protocols"
import { InsertionDetails } from "./protocols"

export interface AddManyCartItemsRepository {
    addManyItems(userDetails: UserDetails, products: InsertionDetails[]): Promise<Cart | null>
}
