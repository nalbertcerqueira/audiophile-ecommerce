import { GetUserProfileGateway } from "@/@core/frontend/domain/gateways/user/profile/getUserProfileGateway"
import { HttpGateway } from "../protocols"
import {
    DefaultUser,
    UserOrGuest
} from "@/@core/frontend/domain/gateways/user/profile/protocols"
import {
    ProfileParams,
    UpdateUserProfileGateway
} from "@/@core/frontend/domain/gateways/user/profile/updateUserProfileGateway"

export class HttpUserProfileGateway
    extends HttpGateway
    implements GetUserProfileGateway, UpdateUserProfileGateway
{
    constructor(private readonly baseApiUrl: string) {
        super()
    }

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
        const formData = new FormData()

        for (const key in data) {
            const value = data[key as keyof ProfileParams]
            if (value) {
                formData.set(key, value)
            }
        }

        const updatedProfile = await this.submitRequest<DefaultUser>({
            url: fullUrl,
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return updatedProfile
    }
}
