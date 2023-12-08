import { CartProduct } from "@/@core/shared/entities/cart/cart"

export interface UserCartItem extends CartProduct {
    readonly userId: string
}

export interface GetCartItemRepository {
    getItem(userId: string, productId: string): Promise<UserCartItem | null>
}
