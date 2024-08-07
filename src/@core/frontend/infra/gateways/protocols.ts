export type HttpGatewayResponse<
    Type extends "success" | "failed",
    Data = Record<string, any>
> = Type extends "success" ? { data: Data } : { errors: string[] }

export interface RequestDetails {
    url: string
    method: "GET" | "POST" | "PUT" | "DELETE"
    body?: Record<string, any>
    headers?: HeadersInit
}
