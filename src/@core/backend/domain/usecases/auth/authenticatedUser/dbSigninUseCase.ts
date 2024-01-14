import { UserProps } from "@/@core/shared/entities/user/user"
import { FindUserByEmailRepository } from "../../../repositories/user/findUserByEmailRepository"
import { HashComparerService } from "../../../services/crypto/hashComparerService"
import { TokenGeneratorService } from "../../../services/token/tokenGeneratorService"

type SinginData = Pick<UserProps, "email" | "password">

export class DbSigninUseCase {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly hashComparer: HashComparerService,
        private readonly tokenGenerator: TokenGeneratorService
    ) {}
    public async execute(signinData: SinginData): Promise<string | null> {
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
