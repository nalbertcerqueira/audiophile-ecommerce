import { DbAuthorizationUseCase } from "../../domain/usecases/auth/authenticatedUser/dbAuthorizationUseCase"
import { DbExternalAuthorizationUseCase } from "../../domain/usecases/auth/externalUser/dbExternalAuthorizationUseCase"
import { Controller } from "../protocols/controller"
import { HttpRequest, HttpResponse } from "../protocols/http"
import { UserType } from "@/@core/shared/entities/user/user"

export class AuthenticatedAuthMiddleware implements Controller {
    constructor(
        private readonly authorizationUseCase: DbAuthorizationUseCase,
        private readonly externalAuthorizationUseCase: DbExternalAuthorizationUseCase
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const accessToken = request.headers?.authorization?.split(" ")[1]
        const unauthorizedHeaders = { "WWW-Authenticate": 'Bearer realm="protected resource"' }
        const unauthorizedMsg =
            "Unauthorized. You need valid credentials to access this content"

        if (!accessToken) {
            return { statusCode: 401, errors: [unauthorizedMsg], headers: unauthorizedHeaders }
        }

        try {
            const [authenticatedUser, externalUser] = await Promise.allSettled([
                this.authorizationUseCase.execute(accessToken),
                this.externalAuthorizationUseCase.execute(accessToken)
            ])

            const selectedUser: { value: any; type: UserType | null } = {
                value: null,
                type: null
            }

            if (authenticatedUser.status === "fulfilled" && authenticatedUser.value) {
                selectedUser.value = authenticatedUser.value
                selectedUser.type = "authenticated"
            }

            if (externalUser.status === "fulfilled" && externalUser.value) {
                selectedUser.value = externalUser.value
                selectedUser.type = "external"
            }

            if (!selectedUser.type || !selectedUser.value) {
                return {
                    statusCode: 401,
                    errors: [unauthorizedMsg],
                    headers: unauthorizedHeaders
                }
            }

            return {
                statusCode: 200,
                data: { ...selectedUser.value, type: selectedUser.type }
            }
        } catch (error: any) {
            return { statusCode: 500, errors: [error.message] }
        }
    }
}
