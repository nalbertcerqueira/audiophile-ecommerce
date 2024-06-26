import { DbSigninInputDTO } from "./userAuthDTOs"
import { HashComparerService } from "../../../services/crypto/hashComparerService"
import { TokenGeneratorService } from "../../../services/token/tokenGeneratorService"
import { FindUserByEmailRepository } from "../../../repositories/user/findUserByEmailRepository"

export class DbSigninUseCase {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly hashComparer: HashComparerService,
        private readonly tokenGenerator: TokenGeneratorService
    ) {}
    public async execute(signinData: DbSigninInputDTO): Promise<string | null> {
        const { email, password } = signinData
        const foundUser = await this.findUserByEmailRepository.findByEmail(email)

        if (!foundUser) {
            return null
        }

        const isPasswordCorrect = await this.hashComparer.compare(password, foundUser.password)

        if (!isPasswordCorrect) {
            return null
        }

        const accessToken = await this.tokenGenerator.generate({
            id: foundUser.id,
            sessionType: "authenticated"
        })

        return accessToken
    }
}
