import { IncomingHttpHeaders } from "http"

export interface HttpResponse {
    statusCode: number
    data?: any
    errors?: string[]
    headers?: Record<string, string>
}

export interface HttpRequest {
    body?: any
    headers?: IncomingHttpHeaders
}
