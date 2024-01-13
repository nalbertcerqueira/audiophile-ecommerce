import { DbAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/authenticatedUser/dbAuthorizationUseCase"
import { AuthorizationMiddleware } from "@/@core/backend/presentation/middlewares/authorizationMiddleware"
import {
    authenticatedJwtTokenService,
    externalJwtTokenService,
    guestJwtTokenService
} from "../services/tokenServiceFactory"
import { mongoUserRepository } from "../repositories/userRepositoryFactory"
import { DbGuestAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/guestUser/dbGuestAuthorizationUseCase"
import { DbExternalAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/externalUser/dbExternalAuthorizationUseCase"
import { mongoExternalUserRepository } from "../repositories/externalUserRepositoryFactory"

function createAuthorizationMiddleware() {
    const dbGuestAuthorizationUseCase = new DbGuestAuthorizationUseCase(guestJwtTokenService)

    const dbAuthorizationUseCase = new DbAuthorizationUseCase(
        authenticatedJwtTokenService,
        mongoUserRepository
    )

    const dbExternalAuthorizationUseeCase = new DbExternalAuthorizationUseCase(
        externalJwtTokenService,
        mongoExternalUserRepository
    )

    return new AuthorizationMiddleware(
        dbAuthorizationUseCase,
        dbGuestAuthorizationUseCase,
        dbExternalAuthorizationUseeCase
    )
}

export const authorizationMiddleware = createAuthorizationMiddleware()
