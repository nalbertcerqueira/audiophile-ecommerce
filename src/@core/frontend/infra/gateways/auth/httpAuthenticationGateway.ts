import {
    AuthenticationGateway,
    AuthData
} from "@/@core/frontend/domain/gateways/auth/authenticationGateway"
import { HttpGatewayResponse } from "../protocols"

export class HttpAuthenticationGateway implements AuthenticationGateway {
    constructor(private readonly baseApiUrl: string) {}

    public async authenticateUser(authData: AuthData): Promise<string | null> {
        const fullUrl = `${this.baseApiUrl}/signin`
        const guestSessionToken = localStorage.getItem("accessToken")

        const response = await fetch(fullUrl, {
            method: "POST",
            body: JSON.stringify(authData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${guestSessionToken}`
            }
        })

        const responseData = await response.json()

        if (response.status >= 400 && response.status < 500) {
            return null
        }

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success", string>
        return data
    }
}
