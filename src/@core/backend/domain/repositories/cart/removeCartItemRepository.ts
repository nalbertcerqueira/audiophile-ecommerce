import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserType } from "@/@core/shared/entities/user/user"
import { RemovalDetails } from "./protocols"

export interface RemoveCartItemRepository {
    removeItem(
        userId: string,
        userType: UserType,
        operationInfo: RemovalDetails
    ): Promise<Cart | null>
}
