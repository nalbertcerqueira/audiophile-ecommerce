import { AuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/authorizationUseCase"
import { jwtTokenService } from "../../services/tokenServiceFactory"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"

function createAuthorizationUseCase(): AuthorizationUseCase {
    const mongoUserRepository = new MongoUserRepository()

    const authorizationUseCase = new AuthorizationUseCase(jwtTokenService, mongoUserRepository)

    return authorizationUseCase
}

export const authorizationUseCase = createAuthorizationUseCase()
