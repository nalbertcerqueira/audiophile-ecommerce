import { Cart, CartProduct, UserType } from "@/@core/shared/entities/cart/cart"

export interface AddCartItemRepository {
    addItem(userId: string, userType: UserType, product: CartProduct): Promise<Cart>
}
