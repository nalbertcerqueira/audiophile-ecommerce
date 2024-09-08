import { Address } from "@/@core/shared/entities/address/address"
import { UserInfo } from "../../protocols"

export interface GetAddressRepository {
    get(user: UserInfo): Promise<Address | null>
}
