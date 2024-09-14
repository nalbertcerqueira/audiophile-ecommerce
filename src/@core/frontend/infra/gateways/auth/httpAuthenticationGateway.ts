import { SigninGateway, AuthData } from "@/@core/frontend/domain/gateways/auth/signinGateway"
import { HttpGatewayResponse } from "../protocols"
import { SignupData, SignupGateway } from "@/@core/frontend/domain/gateways/auth/signupGateway"

export class HttpAuthenticationGateway implements SigninGateway, SignupGateway {
    constructor(private readonly baseApiUrl: string) {}

    public async signIn(data: AuthData): Promise<string | null> {
        const fullUrl = `${this.baseApiUrl}/signin`
        const guestSessionToken = localStorage.getItem("accessToken")

        const response = await fetch(fullUrl, {
            method: "POST",
            body: JSON.stringify(data),
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

        return (responseData as HttpGatewayResponse<"success", string>).data
    }

    public async signUp(data: SignupData): Promise<boolean> {
        const headers: HeadersInit = { "Content-type": "application/json" }
        const response = await fetch("/api/signup", {
            body: JSON.stringify(data),
            method: "POST",
            headers
        })

        const responseData = await response.json()

        if (response.status === 409) {
            return false
        }

        if (!responseData.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        return true
    }
}
