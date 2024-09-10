import { ExternalUser } from "@/@core/shared/entities/user/externalUser"
import { TokenGeneratorService } from "../../../services/token/tokenGeneratorService"
import { ExternalSigninInputDTO } from "./externalAuthDTOs"
import { AddExternalUserRepository } from "../../../repositories/externalUser/addExternalUserRepository"
import { FindExternalUserByEmailRepository } from "../../../repositories/externalUser/findExternalUserByEmailRepository"

export class DbExternalSigninUseCase {
    constructor(
        private readonly findExternalUserByEmalRepository: FindExternalUserByEmailRepository,
        private readonly addExternalUserRepository: AddExternalUserRepository,
        private readonly tokenGeneratorService: TokenGeneratorService
    ) {}

    public async execute(signinData: ExternalSigninInputDTO): Promise<string> {
        const { firstName, lastName, email, image } = signinData

        const foundUser = await this.findExternalUserByEmalRepository.findByEmail(email)
        if (foundUser) {
            return await this.tokenGeneratorService.generate({
                id: foundUser.id,
                sessionType: "external"
            })
        }

        const newUserProps = { firstName, lastName, email, profileImg: image, phone: null }
        const newUser = new ExternalUser(newUserProps)

        const { id } = await this.addExternalUserRepository.add(newUser)
        return await this.tokenGeneratorService.generate({ id: id, sessionType: "external" })
    }
}
