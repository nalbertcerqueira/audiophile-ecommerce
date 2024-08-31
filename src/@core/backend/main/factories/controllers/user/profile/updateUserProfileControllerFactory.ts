import { ZodSchemaValidator } from "@/@core/backend/infra/services/zodSchemaValidator"
import { mongoUserRepository } from "../../../repositories/userRepositoryFactory"
import { DbUpdateUserUseCase } from "@/@core/backend/domain/usecases/user/dbUpdateUserUseCase"
import { zodUserProfileSchema } from "@/@core/backend/infra/services/validators/user/zodUserProfileValidator"
import { UpdateUserProfileController } from "@/@core/backend/presentation/controllers/user/profile/updateUserProfileController"
import { CloudinaryImageStorageService } from "@/@core/backend/infra/services/storage/cloudinaryImageStorageService"
import { ShaHashService } from "@/@core/backend/infra/services/shaHashService"
import { mongoExternalUserRepository } from "../../../repositories/externalUserRepositoryFactory"

function createUpdateUserProfileController() {
    const sha256HashService = new ShaHashService("sha256")
    const zodUserProfileValidator = new ZodSchemaValidator(zodUserProfileSchema)
    const cloudinaryImgStorageService = new CloudinaryImageStorageService({
        folder: `${process.env.CLOUDINARY_PROJECT_FOLDER_NAME}/profile`
    })

    const dbUpdateUserUseCase = new DbUpdateUserUseCase(
        sha256HashService,
        cloudinaryImgStorageService,
        mongoUserRepository,
        mongoExternalUserRepository
    )

    return new UpdateUserProfileController(dbUpdateUserUseCase, zodUserProfileValidator)
}

export const updateUserProfileController = createUpdateUserProfileController()
