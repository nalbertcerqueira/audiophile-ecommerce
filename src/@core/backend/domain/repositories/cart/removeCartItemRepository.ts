import { Cart } from "@/@core/shared/entities/cart/cart"
import { RemovalDetails } from "./protocols"
import { UserInfo } from "./protocols"

export interface RemoveCartItemRepository {
    removeItem(user: UserInfo, operationInfo: RemovalDetails): Promise<Cart | null>
}
