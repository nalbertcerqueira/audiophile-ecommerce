import { DbSigninUseCase } from "@/@core/backend/domain/usecases/auth/dbSigninUseCase"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"
import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"
import { authenticatedJwtTokenService } from "../../services/tokenServiceFactory"

function createDbSigninUseCase(): DbSigninUseCase {
    const mongoUserRepository = new MongoUserRepository()

    return new DbSigninUseCase(
        mongoUserRepository,
        bcryptEncrypterService,
        authenticatedJwtTokenService
    )
}

export const dbSigninUseCase = createDbSigninUseCase()
