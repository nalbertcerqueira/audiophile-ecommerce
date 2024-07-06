import { UserInfo } from "../../protocols"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"

export interface CartItemInputDTO {
    user: UserInfo
    productId: string
    quantity: number
}

export interface MoveCartItemsInputDTO {
    from: UserInfo
    to: UserInfo
    items: Pick<CartProduct, "productId" | "quantity">[]
}
