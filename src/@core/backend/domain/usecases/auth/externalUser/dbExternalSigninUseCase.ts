import { ExternalUserProps } from "@/@core/shared/entities/user/externalUser"
import { UpsertExternalUserRepository } from "../../../repositories/externalUser/upsertExternalUserRepository"
import { ExternalUser } from "@/@core/shared/entities/user/externalUser"
import { TokenGeneratorService } from "../../../services/token/tokenGeneratorService"

interface ExternalSigninInputDTO extends Pick<ExternalUserProps, "name" | "email"> {
    image: string | null
}

export class DbExternalSigninUseCase {
    constructor(
        private readonly upsertExternalUserRepository: UpsertExternalUserRepository,
        private readonly tokenGeneratorService: TokenGeneratorService
    ) {}

    public async execute(signinData: ExternalSigninInputDTO): Promise<string> {
        const { name, email, image } = signinData

        const newUser = new ExternalUser({
            name,
            email,
            images: { profile: image }
        })

        const { id } = await this.upsertExternalUserRepository.upsert(newUser)
        return await this.tokenGeneratorService.generate({
            id: id,
            sessionType: "external"
        })
    }
}
