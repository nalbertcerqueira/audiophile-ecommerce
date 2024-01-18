import { UserType } from "@/@core/shared/entities/user/user"
import { IncomingHttpHeaders } from "http"

export interface HttpUser {
    id: string
    type: UserType
}

interface HttpParams {
    [key: string]: string
}

export interface HttpRequest {
    headers?: IncomingHttpHeaders
    body?: any
    params?: HttpParams
    user?: HttpUser
}

export interface HttpResponse {
    statusCode: number
    data?: any
    errors?: string[]
    headers?: Record<string, string>
}
