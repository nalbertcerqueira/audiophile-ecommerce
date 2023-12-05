import { FindUserByIdRepository } from "../../repositories/user/findUserByIdRepository"
import { TokenVerifierService } from "../../services/tokenVerifierService"

export class AuthorizationUseCase {
    constructor(
        private readonly secretKey: string,
        private readonly tokenVerifierService: TokenVerifierService,
        private readonly findUserByIdRepository: FindUserByIdRepository
    ) {}
    public async execute(accessToken: string): Promise<{ userId: string } | null> {
        const payload = await this.tokenVerifierService.verify(accessToken, this.secretKey)

        if (payload) {
            const { id } = payload
            const foundUser = await this.findUserByIdRepository.findById(id)

            if (foundUser) {
                return { userId: payload.id }
            }
        }

        return null
    }
}
