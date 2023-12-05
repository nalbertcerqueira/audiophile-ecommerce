import { AuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/authorizationUseCase"
import { jwtTokenService } from "../../services/tokenServiceFactory"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"

const secretKey = process.env.SECRET_KEY as string

export function createAuthorizationUseCase(secretKey: string): AuthorizationUseCase {
    const mongoUserRepository = new MongoUserRepository()

    const authorizationUseCase = new AuthorizationUseCase(
        secretKey,
        jwtTokenService,
        mongoUserRepository
    )

    return authorizationUseCase
}

export const authorizationUseCase = createAuthorizationUseCase(secretKey)
