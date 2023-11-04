import { AddUserUseCase } from "@/@core/backend/domain/usecases/user/addUserUseCase"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"
import { BcryptEncrypterService } from "@/@core/backend/infra/services/bcryptEncrypterService"

export function createAddUserUseCase(saltRounds: number) {
    const mongoUserRepository = new MongoUserRepository()
    const bcryptEncrypterService = new BcryptEncrypterService(saltRounds)

    return new AddUserUseCase(mongoUserRepository, mongoUserRepository, bcryptEncrypterService)
}

export const addUserUseCase = createAddUserUseCase(12)
