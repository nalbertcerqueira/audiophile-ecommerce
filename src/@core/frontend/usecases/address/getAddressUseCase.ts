import { Address } from "@/@core/shared/entities/address/address"
import { GetAddressGateway } from "../../domain/gateways/address/getAddressGateway"

export class GetAddressUseCase {
    constructor(private readonly getAddressGateway: GetAddressGateway) {}

    public async execute(): Promise<Address | null> {
        const address = await this.getAddressGateway.get()
        return address
    }
}
