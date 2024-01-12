export interface HttpResponse {
    statusCode: number
    data?: any
    errors?: string[]
}

export interface HttpRequest {
    body?: any
}
