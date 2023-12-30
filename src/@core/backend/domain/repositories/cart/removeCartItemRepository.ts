import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserType } from "@/@core/shared/entities/user/user"

export interface OperationDetails {
    type: "delete" | "decrease"
    readonly productId: string
    quantity: number
}

export interface RemoveCartItemRepository {
    removeItem(
        userId: string,
        userType: UserType,
        operationInfo: OperationDetails
    ): Promise<Cart | null>
}
