import { UserInfo } from "../../protocols"

export interface ClearCartRepository {
    clearCart(user: UserInfo): Promise<void>
}
