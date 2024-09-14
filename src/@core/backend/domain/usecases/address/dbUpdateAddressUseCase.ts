import { Address } from "@/@core/shared/entities/address/address"
import { UpdateAddressRepository } from "../../repositories/address/updateAddressRepository"
import { UpdateAddressInputDTO } from "./addressDTOs"

export class DbUpdateAddressUseCase {
    constructor(private readonly updateAddressRepository: UpdateAddressRepository) {}

    public async execute(data: UpdateAddressInputDTO): Promise<Address | null> {
        const { user, addressData } = data
        const address = await this.updateAddressRepository.update(user, addressData)

        return address
    }
}
