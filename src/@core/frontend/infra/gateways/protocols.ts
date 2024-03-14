export type HttpGatewayResponse<Type extends "success" | "failed"> = Type extends "success"
    ? { data: any }
    : { errors: string[] }

export interface RequestDetails {
    url: string
    method: "GET" | "POST" | "PUT" | "DELETE"
    body?: Record<string, any>
    headers?: HeadersInit
}
