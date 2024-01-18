import { UserType } from "@/@core/shared/entities/user/user"

export interface CartItemInfo {
    readonly productId: string
    quantity: number
}

export interface UserInfo {
    id: string
    type: UserType
}
