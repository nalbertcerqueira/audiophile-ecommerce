import { DbAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/authenticatedUser/dbAuthorizationUseCase"
import { authenticatedJwtTokenService } from "../../../services/tokenServiceFactory"
import { mongoUserRepository } from "../../../repositories/userRepositoryFactory"

function createDbAuthorizationUseCase() {
    return new DbAuthorizationUseCase(authenticatedJwtTokenService, mongoUserRepository)
}

export const dbAuthorizationUseCase = createDbAuthorizationUseCase()
