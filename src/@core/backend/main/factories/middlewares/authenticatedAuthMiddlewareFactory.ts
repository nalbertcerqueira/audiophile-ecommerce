import { dbExternalAuthorizationUseCase } from "../usecases/auth/externalUser/dbExternalAuthorizationFactory"
import { AuthenticatedAuthMiddleware } from "@/@core/backend/presentation/middlewares/authenticatedAuthMiddleware"
import { dbAuthorizationUseCase } from "../usecases/auth/authenticatedUser/dbAuthorizationFactory"

function createAuthenticatedAuthMiddleware() {
    return new AuthenticatedAuthMiddleware(
        dbAuthorizationUseCase,
        dbExternalAuthorizationUseCase
    )
}

export const authenticatedAuthMiddleware = createAuthenticatedAuthMiddleware()
