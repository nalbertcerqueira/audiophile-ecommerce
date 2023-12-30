import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { UserType } from "@/@core/shared/entities/user/user"
import { Cart } from "@/@core/shared/entities/cart/cart"

export interface AddManyCartItemsRepository {
    addManyItems(
        userId: string,
        userType: UserType,
        products: CartProduct[]
    ): Promise<Cart | null>
}
