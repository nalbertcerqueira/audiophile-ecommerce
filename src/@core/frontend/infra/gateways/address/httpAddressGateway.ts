import { GetAddressGateway } from "@/@core/frontend/domain/gateways/address/getAddressGateway"
import { Address, AddressProps } from "@/@core/shared/entities/address/address"
import { UpdateAddressGateway } from "@/@core/frontend/domain/gateways/address/updateAddressGateway"
import { HttpGateway } from "../protocols"

export class HttpAddressGateway
    extends HttpGateway
    implements GetAddressGateway, UpdateAddressGateway
{
    constructor(private readonly baseApiUrl: string) {
        super()
    }

    public async get(): Promise<Address | null> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/user/address`

        const addressProps = await this.submitRequest<AddressProps | null>({
            method: "GET",
            url: fullUrl,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        return addressProps ? new Address(addressProps) : null
    }

    public async update(data: AddressProps): Promise<Address> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/user/address`

        const addressProps = await this.submitRequest({
            method: "PUT",
            url: fullUrl,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return new Address(addressProps as AddressProps)
    }
}
