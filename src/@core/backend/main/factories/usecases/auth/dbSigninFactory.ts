import { DbSigninUseCase } from "@/@core/backend/domain/usecases/auth/dbSigninUseCase"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"
import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"
import { jwtTokenService } from "../../services/tokenServiceFactory"

const secretKey = process.env.SECRET_KEY as string

function createDbSigninUseCase(scretKey: string) {
    const mongoUserRepository = new MongoUserRepository()

    return new DbSigninUseCase(
        scretKey,
        mongoUserRepository,
        bcryptEncrypterService,
        jwtTokenService
    )
}

export const dbSigninUseCase = createDbSigninUseCase(secretKey)
