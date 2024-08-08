import { Cart } from "@/@core/shared/entities/cart/cart"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"

export interface UpdateCartItemGateway {
    updateItem(itemRef: Pick<CartProduct, "productId" | "quantity">): Promise<Cart>
}
