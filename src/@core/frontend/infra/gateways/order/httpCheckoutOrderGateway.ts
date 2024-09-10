import { createCheckoutOrderGateway } from "@/@core/frontend/domain/gateways/order/createCheckoutOrderGateway"
import { HttpGateway } from "../protocols"
import { GetOrderTaxesGateway } from "@/@core/frontend/domain/gateways/order/getOrderTaxesGateway"
import {
    CheckoutOrder,
    CheckoutOrderProps,
    Taxes
} from "@/@core/shared/entities/order/checkoutOrder"

export class HttpCheckoutOrderGateway
    extends HttpGateway
    implements createCheckoutOrderGateway, GetOrderTaxesGateway
{
    constructor(private readonly baseApiUrl: string) {
        super()
    }

    public async create(): Promise<CheckoutOrder> {
        const accessToken = localStorage.getItem("accessToken") as string
        const fullUrl = `${this.baseApiUrl}/checkout`

        const data = await this.submitRequest<CheckoutOrderProps>({
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

        const data = await this.submitRequest<Taxes>({
            url: fullUrl,
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return data
    }
}
