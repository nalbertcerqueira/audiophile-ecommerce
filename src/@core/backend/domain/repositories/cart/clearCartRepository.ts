import { UserInfo } from "../../protocols"

export interface ClearCartRepository {
    clearCartById(user: UserInfo): Promise<void>
}
