import { AddUserUseCase } from "@/@core/backend/domain/usecases/user/addUserUseCase"
import { MongoUserRepository } from "@/@core/backend/infra/db/mongo/repositories/user/mongoUserRepository"
import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"

export function createAddUserUseCase() {
    const mongoUserRepository = new MongoUserRepository()

    return new AddUserUseCase(mongoUserRepository, mongoUserRepository, bcryptEncrypterService)
}

export const addUserUseCase = createAddUserUseCase()
