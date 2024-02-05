import { HttpResponse } from "../protocols/http"

export function unauthorizedError(message?: string): HttpResponse {
    const defaultMessage = "Unauthorized. You need valid credentials to access this content"

    return {
        statusCode: 401,
        errors: [message || defaultMessage],
        headers: { "WWW-Authenticate": 'Bearer realm="protected resource"' }
    }
}

export function serverError(message?: string): HttpResponse {
    const defaultMessage =
        "Sorry, Something went wrong with your request. We're working to fix the issue."

    return {
        statusCode: 500,
        errors: [message || defaultMessage]
    }
}
