import { UnauthorizedError } from "@/@core/backend/presentation/errors"
import { createCheckoutOrderGateway } from "@/@core/frontend/domain/gateways/order/createCheckoutOrderGateway"
import { HttpGatewayResponse } from "../protocols"

export class HttpCheckoutOrderGateway implements createCheckoutOrderGateway {
    constructor(private readonly baseApiUrl: string) {}

    public async create(): Promise<void> {
        const accessToken = localStorage.getItem("accessToken") as string
        const fullUrl = `${this.baseApiUrl}/checkout`

        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        const responseData = await response.json()

        if (response.status === 401) {
            throw new UnauthorizedError("User unauthorized")
        }

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }
    }
}
