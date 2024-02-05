import { DbExternalAuthorizationUseCase } from "../../domain/usecases/auth/externalUser/dbExternalAuthorizationUseCase"
import { serverError, unauthorizedError } from "../helpers/errors"
import { HttpRequest, HttpResponse } from "../protocols/http"
import { DbAuthorizationUseCase } from "../../domain/usecases/auth/authenticatedUser/dbAuthorizationUseCase"
import { Controller } from "../protocols/controller"
import { UserType } from "@/@core/shared/entities/user/user"

export class AuthenticatedAuthMiddleware implements Controller {
    constructor(
        private readonly authorizationUseCase: DbAuthorizationUseCase,
        private readonly externalAuthorizationUseCase: DbExternalAuthorizationUseCase
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const accessToken = request.headers?.authorization?.split(" ")[1]
        if (!accessToken) {
            return unauthorizedError()
        }

        try {
            //Verificando se o usuário em questão passa em alguma das validações (de usuário
            //comum ou externo)
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
            } else if (externalUser.status === "fulfilled" && externalUser.value) {
                selectedUser.value = externalUser.value
                selectedUser.type = "external"
            }

            if (!selectedUser.type || !selectedUser.value) {
                return unauthorizedError()
            }

            return {
                statusCode: 200,
                data: { ...selectedUser.value, type: selectedUser.type }
            }
        } catch (error: any) {
            return serverError()
        }
    }
}
