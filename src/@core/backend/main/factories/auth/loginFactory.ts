import { LoginUseCase } from "@/@core/backend/domain/usecases/auth/loginUseCase"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"
import { bcryptEncrypterService } from "../services/encrypterServiceFactory"
import { jwtTokenService } from "../services/tokenServiceFactory"

const secretKey = process.env.SECRET_KEY as string

function createLoginUseCase(scretKey: string) {
    const mongoUserRepository = new MongoUserRepository()

    return new LoginUseCase(
        scretKey,
        mongoUserRepository,
        bcryptEncrypterService,
        jwtTokenService
    )
}

export const loginUseCase = createLoginUseCase(secretKey)
