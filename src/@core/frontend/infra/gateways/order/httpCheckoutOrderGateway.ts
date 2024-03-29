import { UnauthorizedError } from "@/@core/frontend/infra/errors"
import { createCheckoutOrderGateway } from "@/@core/frontend/domain/gateways/order/createCheckoutOrderGateway"
import { HttpGatewayResponse, RequestDetails } from "../protocols"
import { GetOrderTaxesGateway } from "@/@core/frontend/domain/gateways/order/getOrderTaxesGateway"
import { CheckoutOrder, Taxes } from "@/@core/shared/entities/order/checkoutOrder"

export class HttpCheckoutOrderGateway
    implements createCheckoutOrderGateway, GetOrderTaxesGateway
{
    constructor(private readonly baseApiUrl: string) {}

    public async create(): Promise<CheckoutOrder> {
        const accessToken = localStorage.getItem("accessToken") as string
        const fullUrl = `${this.baseApiUrl}/checkout`

        const data = await this.submitRequest({
            url: fullUrl,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return new CheckoutOrder(data)
    }

    public async getTaxes(): Promise<Taxes> {
        const accessToken = localStorage.getItem("accessToken") as string
        const fullUrl = `${this.baseApiUrl}/checkout/taxes`

        const data = await this.submitRequest({
            url: fullUrl,
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return data
    }

    private async submitRequest(request: RequestDetails): Promise<any> {
        const { url, method, headers, body } = request

        const response = await fetch(url, {
            method: method,
            body: body && JSON.stringify(body),
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

        const { data } = responseData as HttpGatewayResponse<"success">
        return data
    }
}
