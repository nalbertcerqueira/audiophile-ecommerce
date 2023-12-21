import { authenticatedJwtTokenService } from "../../services/tokenServiceFactory"
import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"
import { mongoUserRepository } from "../../repositories/userRepositoryFactory"
import { DbSigninUseCase } from "@/@core/backend/domain/usecases/auth/dbSigninUseCase"

function createDbSigninUseCase(): DbSigninUseCase {
    return new DbSigninUseCase(
        mongoUserRepository,
        bcryptEncrypterService,
        authenticatedJwtTokenService
    )
}

export const dbSigninUseCase = createDbSigninUseCase()
