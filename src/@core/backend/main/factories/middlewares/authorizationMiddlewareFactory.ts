import { dbExternalAuthorizationUseCase } from "../usecases/auth/externalUser/dbExternalAuthorizationFactory"
import { dbGuestAuthorizationUseCase } from "../usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { AuthorizationMiddleware } from "@/@core/backend/presentation/middlewares/authorizationMiddleware"
import { dbAuthorizationUseCase } from "../usecases/auth/authenticatedUser/dbAuthorizationFactory"

function createAuthorizationMiddleware(): AuthorizationMiddleware {
    return new AuthorizationMiddleware(
        dbAuthorizationUseCase,
        dbGuestAuthorizationUseCase,
        dbExternalAuthorizationUseCase
    )
}

//Middleware para verificar se o usuário possui permissão para acessar o conteúdo.
//O middleware também dá acesso a usuários convidados (ou anônimos) que passarem na validação
export const authorizationMiddleware = createAuthorizationMiddleware()
