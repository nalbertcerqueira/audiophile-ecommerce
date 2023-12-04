import {
    CreateUserGateway,
    UserData
} from "@/@core/frontend/domain/gateways/user/createUserGateway"
import { HttpGatewayResponse } from "../protocols"

export class HttpUserGateway implements CreateUserGateway {
    constructor(private readonly apiUrl: string) {}

    public async add(userInfo: UserData): Promise<boolean> {
        const headers: HeadersInit = { "Content-type": "application/json" }
        const response = await fetch(this.apiUrl, {
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
}
