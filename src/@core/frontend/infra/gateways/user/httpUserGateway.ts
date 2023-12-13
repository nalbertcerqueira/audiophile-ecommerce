import {
    CreateUserGateway,
    UserData
} from "@/@core/frontend/domain/gateways/user/createUserGateway"
import { HttpGatewayResponse } from "../protocols"
import { GetUserGateway } from "@/@core/frontend/domain/gateways/user/getUserGateway"
import { UserProps } from "@/@core/shared/entities/user/user"

export class HttpUserGateway implements CreateUserGateway, GetUserGateway {
    public async create(userInfo: UserData): Promise<boolean> {
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

    public async getUser(): Promise<Pick<UserProps, "id" | "name" | "email"> | null> {
        const sessionToken = localStorage.getItem("sessionToken") as string

        const response = await fetch("/api/auth/user", {
            headers: { Authorization: `Bearer ${sessionToken}` }
        })

        if (response.ok) {
            const responseData = (await response.json()) as HttpGatewayResponse<"success">
            const { data } = responseData

            return data
        }

        return null
    }
}
