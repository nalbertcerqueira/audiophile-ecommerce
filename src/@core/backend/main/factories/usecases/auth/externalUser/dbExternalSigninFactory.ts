import { DbExternalSigninUseCase } from "@/@core/backend/domain/usecases/auth/externalUser/dbExternalSigninUseCase"
import { mongoExternalUserRepository } from "../../../repositories/externalUserRepositoryFactory"
import { externalJwtTokenService } from "../../../services/tokenServiceFactory"

export function createDbExternalSigninUseCase() {
    return new DbExternalSigninUseCase(
        mongoExternalUserRepository,
        mongoExternalUserRepository,
        externalJwtTokenService
    )
}

export const dbExternalSigninUseCase = createDbExternalSigninUseCase()
