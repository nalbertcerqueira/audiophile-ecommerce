import {
    AuthenticationGateway,
    AuthData
} from "@/@core/frontend/domain/gateways/auth/authenticationGateway"
import { HttpGatewayResponse } from "../protocols"

export class HttpAuthenticationGateway implements AuthenticationGateway {
    constructor(private readonly apiUrl: string) {}

    public async authenticateUser(authData: AuthData): Promise<string | null> {
        const headers: HeadersInit = { "Content-Type": "application/json" }
        const response = await fetch(this.apiUrl, {
            method: "POST",
            body: JSON.stringify(authData),
            headers
        })

        const responseData = await response.json()

        if (response.status >= 400 && response.status < 500) {
            return null
        }

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success">
        return data
    }
}
