import { Address, AddressProps } from "@/@core/shared/entities/address/address"
import { UpdateAddressGateway } from "../../domain/gateways/address/updateAddressGateway"

export class UpdateAddressUseCase {
    constructor(private readonly updateAddressGateway: UpdateAddressGateway) {}

    public async execute(data: AddressProps): Promise<Address> {
        const address = await this.updateAddressGateway.update(data)
        return address
    }
}
