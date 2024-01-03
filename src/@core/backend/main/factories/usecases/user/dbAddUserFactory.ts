import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"
import { mongoUserRepository } from "../../repositories/userRepositoryFactory"
import { DbAddUserUseCase } from "@/@core/backend/domain/usecases/user/dbAddUserUseCase"
import { mongoExternalUserRepository } from "../../repositories/externalUserRepositoryFactory"

export function createDbAddUserUseCase(): DbAddUserUseCase {
    return new DbAddUserUseCase(
        mongoExternalUserRepository,
        mongoUserRepository,
        mongoUserRepository,
        bcryptEncrypterService
    )
}

export const dbAddUserUseCase = createDbAddUserUseCase()
