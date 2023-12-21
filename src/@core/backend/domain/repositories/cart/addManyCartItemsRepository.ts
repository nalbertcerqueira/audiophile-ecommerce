import { CartProduct, UserType } from "@/@core/shared/entities/cart/cart"
import { Cart } from "@/@core/shared/entities/cart/cart"

export interface AddManyCartItemsRepository {
    addManyItems(
        userId: string,
        userType: UserType,
        products: CartProduct[]
    ): Promise<Cart | null>
}
