import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserDetails } from "../protocols"
import { RemovalDetails } from "./protocols"

export interface RemoveCartItemRepository {
    removeItem(userDetails: UserDetails, operationInfo: RemovalDetails): Promise<Cart | null>
}
