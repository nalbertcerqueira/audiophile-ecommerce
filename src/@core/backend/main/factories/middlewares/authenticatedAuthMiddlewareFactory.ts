import { dbExternalAuthorizationUseCase } from "../usecases/auth/externalUser/dbExternalAuthorizationFactory"
import { AuthenticatedAuthMiddleware } from "@/@core/backend/presentation/middlewares/authenticatedAuthMiddleware"
import { dbAuthorizationUseCase } from "../usecases/auth/authenticatedUser/dbAuthorizationFactory"

function createAuthenticatedAuthMiddleware(): AuthenticatedAuthMiddleware {
    return new AuthenticatedAuthMiddleware(
        dbAuthorizationUseCase,
        dbExternalAuthorizationUseCase
    )
}

//Middleware para verificar se o usuário possui permissão para acessar o conteúdo.
//Nesse caso, o usuário convidado (ou anônimo) não possui permissão
export const authenticatedAuthMiddleware = createAuthenticatedAuthMiddleware()
