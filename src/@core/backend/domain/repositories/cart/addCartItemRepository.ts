import { Cart, CartProduct } from "@/@core/shared/entities/cart/cart"
import { UserType } from "@/@core/shared/entities/user/user"

export interface AddCartItemRepository {
    addItem(userId: string, userType: UserType, product: CartProduct): Promise<Cart>
}
