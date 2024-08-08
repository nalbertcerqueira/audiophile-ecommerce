import { UserInfo } from "../../protocols"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"

export interface CartItemInputDTO {
    user: UserInfo
    itemRef: Pick<CartProduct, "productId" | "quantity">
}

export interface MoveCartItemsInputDTO {
    from: UserInfo
    to: UserInfo
    itemRefs: Pick<CartProduct, "productId" | "quantity">[]
}
