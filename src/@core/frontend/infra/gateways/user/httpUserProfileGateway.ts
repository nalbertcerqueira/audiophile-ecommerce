import { GetUserProfileGateway } from "@/@core/frontend/domain/gateways/user/profile/getUserProfileGateway"
import { HttpGatewayResponse } from "../protocols"
import {
    DefaultUser,
    UserOrGuest
} from "@/@core/frontend/domain/gateways/user/profile/protocols"
import {
    ProfileParams,
    UpdateUserProfileGateway
} from "@/@core/frontend/domain/gateways/user/profile/updateUserProfileGateway"
import { RequestDetails } from "../protocols"
import { UnauthorizedError } from "../../errors"

export class HttpUserProfileGateway
    implements GetUserProfileGateway, UpdateUserProfileGateway
{
    constructor(private readonly baseApiUrl: string) {}

    public async getProfile(): Promise<UserOrGuest> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/user/profile`

        const profile = await this.submitRequest<UserOrGuest>({
            method: "GET",
            url: fullUrl,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        return profile
    }

    public async update(data: ProfileParams): Promise<DefaultUser> {
        const accessToken = localStorage.getItem("accessToken") as string
        const fullUrl = `${this.baseApiUrl}/user/profile`

        const updatedProfile = await this.submitRequest<DefaultUser>({
            url: fullUrl,
            method: "PUT",
            body: data,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return updatedProfile
    }

    private async submitRequest<T>(request: RequestDetails): Promise<T> {
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

        const { data } = responseData as HttpGatewayResponse<"success", T>

        return data
    }
}
