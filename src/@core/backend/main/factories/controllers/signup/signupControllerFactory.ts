import { DbAddUserUseCase } from "@/@core/backend/domain/usecases/user/dbAddUserUseCase"
import { zodSignupSchema } from "@/@core/backend/infra/services/validators/signup/zodSignupValidator"
import { SignupController } from "@/@core/backend/presentation/controllers/signup/signupController"
import { mongoExternalUserRepository } from "../../repositories/externalUserRepositoryFactory"
import { mongoUserRepository } from "../../repositories/userRepositoryFactory"
import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"
import { ZodSchemaValidator } from "@/@core/backend/infra/services/zodSchemaValidator"

function createSignupController() {
    const zodSignupValidator = new ZodSchemaValidator(zodSignupSchema)
    const dbAddUserUseCase = new DbAddUserUseCase(
        mongoExternalUserRepository,
        mongoUserRepository,
        mongoUserRepository,
        bcryptEncrypterService
    )
    return new SignupController(zodSignupValidator, dbAddUserUseCase)
}

export const signupController = createSignupController()
