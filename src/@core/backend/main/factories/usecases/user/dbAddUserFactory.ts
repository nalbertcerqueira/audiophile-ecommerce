import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"
import { mongoUserRepository } from "../../repositories/userRepositoryFactory"
import { DbAddUserUseCase } from "@/@core/backend/domain/usecases/user/dbAddUserUseCase"

export function createDbAddUserUseCase(): DbAddUserUseCase {
    return new DbAddUserUseCase(
        mongoUserRepository,
        mongoUserRepository,
        bcryptEncrypterService
    )
}

export const dbAddUserUseCase = createDbAddUserUseCase()
