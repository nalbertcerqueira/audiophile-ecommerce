import { UserInfo } from "../../protocols"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"

export interface CartItemInputDTO {
    user: UserInfo
    item: Pick<CartProduct, "productId" | "quantity">
}

export interface MoveCartItemsInputDTO {
    from: UserInfo
    to: UserInfo
    items: Pick<CartProduct, "productId" | "quantity">[]
}
