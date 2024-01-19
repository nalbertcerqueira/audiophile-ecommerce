import { dbExternalAuthorizationUseCase } from "../usecases/auth/externalUser/dbExternalAuthorizationFactory"
import { dbGuestAuthorizationUseCase } from "../usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { AuthorizationMiddleware } from "@/@core/backend/presentation/middlewares/authorizationMiddleware"
import { dbAuthorizationUseCase } from "../usecases/auth/authenticatedUser/dbAuthorizationFactory"

function createAuthorizationMiddleware() {
    return new AuthorizationMiddleware(
        dbAuthorizationUseCase,
        dbGuestAuthorizationUseCase,
        dbExternalAuthorizationUseCase
    )
}

export const authorizationMiddleware = createAuthorizationMiddleware()
