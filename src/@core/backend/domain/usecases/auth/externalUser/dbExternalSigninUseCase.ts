import { ExternalUserProps } from "@/@core/shared/entities/user/externalUser"
import { FindExternalUserByEmailRepository } from "../../../repositories/externalUser/findExternalUserByEmailRepository"
import { AddExternalUserRepository } from "../../../repositories/externalUser/addExternalUserRepositry"
import { ExternalUser } from "@/@core/shared/entities/user/externalUser"
import { TokenGeneratorService } from "../../../services/token/tokenGeneratorService"

interface ExternalSigninInputDTO extends Pick<ExternalUserProps, "name" | "email"> {
    image: string | null
}

export class DbExternalSigninUseCase {
    constructor(
        private readonly findExternalUserByEmailRepository: FindExternalUserByEmailRepository,
        private readonly addExternalUserRepository: AddExternalUserRepository,
        private readonly tokenGeneratorService: TokenGeneratorService
    ) {}

    public async execute(signinData: ExternalSigninInputDTO): Promise<string> {
        const { name, email, image } = signinData
        let currentId = null

        const foundUser = await this.findExternalUserByEmailRepository.findByEmail(email)

        if (!foundUser) {
            const newUser = new ExternalUser({
                name,
                email,
                images: { profile: image }
            })
            const { id } = await this.addExternalUserRepository.add(newUser)
            currentId = id
        } else {
            currentId = foundUser.id
        }

        return await this.tokenGeneratorService.generate({
            id: currentId,
            sessionType: "external"
        })
    }
}
