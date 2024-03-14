import { UserDetails } from "../protocols"

export interface ClearCartRepository {
    clearCartById(userDetails: UserDetails): Promise<void>
}
