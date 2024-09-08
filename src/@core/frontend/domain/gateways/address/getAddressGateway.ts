import { Address } from "@/@core/shared/entities/address/address"

export interface GetAddressGateway {
    get(): Promise<Address | null>
}
