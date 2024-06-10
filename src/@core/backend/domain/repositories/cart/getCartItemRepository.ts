import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { UserInfo } from "../../usecases/protocols"

export interface GetCartItemRepository {
    getItem(user: UserInfo, productId: string): Promise<CartProduct | null>
}
