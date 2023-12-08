import { DbAddUserUseCase } from "@/@core/backend/domain/usecases/user/dbAddUserUseCase"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"
import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"

export function createDbAddUserUseCase() {
    const mongoUserRepository = new MongoUserRepository()

    return new DbAddUserUseCase(
        mongoUserRepository,
        mongoUserRepository,
        bcryptEncrypterService
    )
}

export const dbAddUserUseCase = createDbAddUserUseCase()
