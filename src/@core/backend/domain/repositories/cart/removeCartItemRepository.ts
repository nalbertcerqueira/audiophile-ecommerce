import { Cart, UserType } from "@/@core/shared/entities/cart/cart"

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
