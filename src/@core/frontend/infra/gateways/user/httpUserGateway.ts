import { HttpGatewayResponse } from "../protocols"
import {
    CreateUserGateway,
    SignupData
} from "@/@core/frontend/domain/gateways/user/createUserGateway"
import {
    GetUserGateway,
    UserOrGuestToken
} from "@/@core/frontend/domain/gateways/user/getUserGateway"

export class HttpUserGateway implements CreateUserGateway, GetUserGateway {
    public async create(userInfo: SignupData): Promise<boolean> {
        const headers: HeadersInit = { "Content-type": "application/json" }
        const response = await fetch("/api/signup", {
            body: JSON.stringify(userInfo),
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

    public async getUser(): Promise<UserOrGuestToken> {
        const accessToken = localStorage.getItem("accessToken") as string

        const response = await fetch("/api/auth/user", {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const responseData = await response.json()

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success">

        return data
    }
}
