import { FindUserByIdRepository } from "../../repositories/user/findUserByIdRepository"
import { TokenVerifierService } from "../../services/token/tokenVerifierService"
import { User } from "@/@core/shared/entities/user/user"

export class DbAuthorizationUseCase {
    constructor(
        private readonly tokenVerifierService: TokenVerifierService,
        private readonly findUserByIdRepository: FindUserByIdRepository
    ) {}
    public async execute(token: string): Promise<User | null> {
        const payload = await this.tokenVerifierService.verify(token)

        if (payload && payload.sessionType === "authenticated") {
            const { id } = payload
            const foundUser = await this.findUserByIdRepository.findById(id)

            if (foundUser) {
                return foundUser
            }
        }

        return null
    }
}
