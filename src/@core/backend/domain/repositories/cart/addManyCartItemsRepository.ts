import { UserType } from "@/@core/shared/entities/user/user"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { InsertionDetails } from "./protocols"

export interface AddManyCartItemsRepository {
    addManyItems(
        userId: string,
        userType: UserType,
        products: InsertionDetails[]
    ): Promise<Cart | null>
}
