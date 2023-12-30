import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { UserType } from "@/@core/shared/entities/user/user"

export interface UserCartItem extends CartProduct {
    readonly userId: string
}

export interface GetCartItemRepository {
    getItem(
        userId: string,
        userType: UserType,
        productId: string
    ): Promise<UserCartItem | null>
}
