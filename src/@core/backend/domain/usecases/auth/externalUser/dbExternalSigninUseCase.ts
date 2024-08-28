import { ExternalUser } from "@/@core/shared/entities/user/externalUser"
import { TokenGeneratorService } from "../../../services/token/tokenGeneratorService"
import { ExternalSigninInputDTO } from "./externalAuthDTOs"
import { UpsertExternalUserRepository } from "../../../repositories/externalUser/upsertExternalUserRepository"

export class DbExternalSigninUseCase {
    constructor(
        private readonly upsertExternalUserRepository: UpsertExternalUserRepository,
        private readonly tokenGeneratorService: TokenGeneratorService
    ) {}

    public async execute(signinData: ExternalSigninInputDTO): Promise<string> {
        const { firstName, lastName, email, image } = signinData

        const newUser = new ExternalUser({
            firstName,
            lastName,
            email,
            profileImg: image,
            phone: null
        })

        const { id } = await this.upsertExternalUserRepository.upsert(newUser)
        return await this.tokenGeneratorService.generate({
            id: id,
            sessionType: "external"
        })
    }
}
