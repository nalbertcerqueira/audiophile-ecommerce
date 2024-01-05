import { DbExternalAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/externalUser/dbExternalAuthorizationUseCase"
import { externalJwtTokenService } from "../../../services/tokenServiceFactory"
import { mongoExternalUserRepository } from "../../../repositories/externalUserRepositoryFactory"

function createDbExternalAuthorizationUseCase() {
    return new DbExternalAuthorizationUseCase(
        externalJwtTokenService,
        mongoExternalUserRepository
    )
}

export const dbExternalAuthorizationUseCase = createDbExternalAuthorizationUseCase()
