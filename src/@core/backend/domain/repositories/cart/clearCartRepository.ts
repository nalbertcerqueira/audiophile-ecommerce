import { UserInfo } from "../../usecases/protocols"

export interface ClearCartRepository {
    clearCartById(user: UserInfo): Promise<void>
}
