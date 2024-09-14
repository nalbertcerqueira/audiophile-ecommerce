import { Address, AddressProps } from "@/@core/shared/entities/address/address"

export interface UpdateAddressGateway {
    update(data: AddressProps): Promise<Address>
}
