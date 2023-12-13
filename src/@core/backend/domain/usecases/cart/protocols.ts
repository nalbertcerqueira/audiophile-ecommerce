import { UserType } from "@/@core/shared/entities/cart/cart"

export interface CartItemInfo {
    readonly productId: string
    quantity: number
}

export interface UserInfo {
    id: string
    type: UserType
}
