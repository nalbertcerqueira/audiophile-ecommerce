import { LoginUseCase } from "@/@core/backend/domain/usecases/auth/loginUseCase"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"
import { bcryptEncrypterService } from "../services/encrypterServiceFactory"
import { jwtTokenService } from "../services/tokenServiceFactory"

function createLoginUseCase() {
    const mongoUserRepository = new MongoUserRepository()

    return new LoginUseCase(mongoUserRepository, bcryptEncrypterService, jwtTokenService)
}

export const loginUseCase = createLoginUseCase()
