import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserInfo } from "../../usecases/protocols"

export interface GetCartRepository {
    getCartById(user: UserInfo): Promise<Cart | null>
}
