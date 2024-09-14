import { AddressProps } from "@/@core/shared/entities/address/address"
import { UserInfo } from "../../protocols"

export interface UpdateAddressInputDTO {
    user: UserInfo
    addressData: AddressProps
}
