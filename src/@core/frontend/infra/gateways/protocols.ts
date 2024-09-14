import { UnauthorizedError } from "../errors"

export type HttpGatewayResponse<
    Type extends "success" | "failed",
    Data = Record<string, any>
> = Type extends "success" ? { data: Data } : { errors: string[] }

export interface RequestDetails {
    url: string
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
    body?: BodyInit
    headers?: HeadersInit
}

export abstract class HttpGateway {
    protected async submitRequest<T>(request: RequestDetails): Promise<T> {
        const { url, method, headers, body } = request

        const response = await fetch(url, {
            method: method,
            body: body,
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
