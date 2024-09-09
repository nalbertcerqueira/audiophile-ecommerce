import { GetAddressGateway } from "@/@core/frontend/domain/gateways/address/getAddressGateway"
import { Address, AddressProps } from "@/@core/shared/entities/address/address"
import { RequestDetails, HttpGatewayResponse } from "../protocols"
import { UnauthorizedError } from "../../errors"
import { UpdateAddressGateway } from "@/@core/frontend/domain/gateways/address/updateAddressGateway"

export class HttpAddressGateway implements GetAddressGateway, UpdateAddressGateway {
    constructor(private readonly baseApiUrl: string) {}

    public async get(): Promise<Address | null> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/user/address`

        const addressProps = await this.submitRequest({
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

    private async submitRequest(request: RequestDetails): Promise<AddressProps | null> {
        const { url, method, headers, body } = request

        const response = await fetch(url, {
            method: method,
            body: body,
            headers: headers
        })

        const responseData = await response.json()

        if (response.status === 401) {
            throw new UnauthorizedError("User unauthorized")
        }

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success", AddressProps>

        return data
    }
}