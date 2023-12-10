import { DbSigninUseCase } from "@/@core/backend/domain/usecases/auth/dbSigninUseCase"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"
import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"
import { jwtTokenService } from "../../services/tokenServiceFactory"

function createDbSigninUseCase() {
    const mongoUserRepository = new MongoUserRepository()

    return new DbSigninUseCase(mongoUserRepository, bcryptEncrypterService, jwtTokenService)
}

export const dbSigninUseCase = createDbSigninUseCase()
