import { DbAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/dbAuthorizationUseCase"
import { jwtTokenService } from "../../services/tokenServiceFactory"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"

function createDbAuthorizationUseCase(): DbAuthorizationUseCase {
    const mongoUserRepository = new MongoUserRepository()

    return new DbAuthorizationUseCase(jwtTokenService, mongoUserRepository)
}

export const dbAuthorizationUseCase = createDbAuthorizationUseCase()
