import { Address } from "@/@core/shared/entities/address/address"
import { UserInfo } from "../../protocols"
import { GetAddressRepository } from "../../repositories/address/getAddressRepository"

export class DbGetAddressUseCase {
    constructor(private readonly getAddressRepository: GetAddressRepository) {}

    public async execute(user: UserInfo): Promise<Address | null> {
        const foundAddress = await this.getAddressRepository.get(user)

        return foundAddress
    }
}
