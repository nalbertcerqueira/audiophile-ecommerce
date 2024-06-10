import { Cart } from "@/@core/shared/entities/cart/cart"
import { InsertionDetails } from "./protocols"
import { UserInfo } from "../../usecases/protocols"

export interface AddManyCartItemsRepository {
    addManyItems(user: UserInfo, products: InsertionDetails[]): Promise<Cart | null>
}
