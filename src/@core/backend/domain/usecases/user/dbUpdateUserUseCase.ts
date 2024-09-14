import { HashService } from "../../services/crypto/hashService"
import { ImageStorageService } from "../../services/imageStorageService"
import { UpdateUserRepository } from "../../repositories/user/updateUserRepository"
import { UpdateExternalUserRepository } from "../../repositories/externalUser/updateExternalUserRepository"
import { UpdateUserInputDTO, UpdateUserOutputDTO } from "./userDTOs"

export class DbUpdateUserUseCase {
    constructor(
        private readonly hashService: HashService,
        private readonly imageStorageService: ImageStorageService,
        private readonly updateUserRepository: UpdateUserRepository,
        private readonly updateExternalUserRepository: UpdateExternalUserRepository
    ) {}

    public async execute(userProps: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
        const { id, type, profileImg, ...props } = userProps

        const imageId = await this.hashService.hash(`${id}-${type}`)
        const imageUrl = profileImg
            ? await this.imageStorageService.store(imageId, profileImg)
            : undefined

        switch (type) {
            case "authenticated": {
                const updatedUser = await this.updateUserRepository.update(id, {
                    ...props,
                    profileImg: imageUrl
                })
                return updatedUser ? { type, ...updatedUser } : null
            }
            case "external": {
                const updatedUser = await this.updateExternalUserRepository.update(id, {
                    ...props,
                    profileImg: imageUrl
                })
                return updatedUser ? { type, ...updatedUser } : null
            }
            default: {
                return null
            }
        }
    }
}
