import { UserType } from "@/@core/shared/entities/user/user"
import { IncomingHttpHeaders } from "http"

export interface HttpUser {
    id: string
    type: UserType
}

export interface HttpRequest {
    body?: any
    headers?: IncomingHttpHeaders
    user?: HttpUser
}

export interface HttpResponse {
    statusCode: number
    data?: any
    errors?: string[]
    headers?: Record<string, string>
}
