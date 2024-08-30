import {
    GetUserProfileGateway,
    UserOrGuestToken
} from "@/@core/frontend/domain/gateways/user/profile/getUserProfileGateway"
import { HttpGatewayResponse } from "../protocols"

export class HttpUserProfileGateway implements GetUserProfileGateway {
    public async getProfile(): Promise<UserOrGuestToken> {
        const accessToken = localStorage.getItem("accessToken") as string

        const response = await fetch("/api/auth/user/profile", {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const responseData = await response.json()

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success", UserOrGuestToken>

        return data
    }
}
