import { authenticatedJwtTokenService } from "../../services/tokenServiceFactory"
import { DbAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/dbAuthorizationUseCase"
import { mongoUserRepository } from "../../repositories/userRepositoryFactory"

function createDbAuthorizationUseCase(): DbAuthorizationUseCase {
    return new DbAuthorizationUseCase(authenticatedJwtTokenService, mongoUserRepository)
}

export const dbAuthorizationUseCase = createDbAuthorizationUseCase()
