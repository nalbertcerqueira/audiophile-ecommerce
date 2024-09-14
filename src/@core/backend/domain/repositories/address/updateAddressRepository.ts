import { Address, AddressProps } from "@/@core/shared/entities/address/address"
import { UserInfo } from "../../protocols"

export interface UpdateAddressRepository {
    update(user: UserInfo, props: AddressProps): Promise<Address | null>
}
