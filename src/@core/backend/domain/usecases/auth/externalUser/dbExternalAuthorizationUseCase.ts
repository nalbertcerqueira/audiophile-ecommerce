import { TokenVerifierService } from "../../../services/token/tokenVerifierService"
import { FindExternalUserByIdRepository } from "../../../repositories/externalUser/findExternalUserByIdRepository"
import { ExternalAuthorizationOutputDTO } from "./externalAuthDTOs"

export class DbExternalAuthorizationUseCase {
    constructor(
        private readonly tokenVerifierService: TokenVerifierService,
        private readonly findExternalUserByIdRepository: FindExternalUserByIdRepository
    ) {}

    public async execute(token: string): Promise<ExternalAuthorizationOutputDTO | null> {
        const payload = await this.tokenVerifierService.verify(token)

        if (!payload || payload.sessionType !== "external") {
            return null
        }

        const { id } = payload
        const foundExternalUser = await this.findExternalUserByIdRepository.findById(id)

        if (!foundExternalUser) {
            return null
        }

        return { id, ...foundExternalUser.toJSON() }
    }
}
