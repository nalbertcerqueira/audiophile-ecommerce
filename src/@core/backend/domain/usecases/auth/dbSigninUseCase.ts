import { UserProps } from "@/@core/shared/entities/user/user"
import { FindUserByEmailRepository } from "../../repositories/user/findUserByEmailRepository"
import { HashComparerService } from "../../services/crypto/hashComparerService"
import { TokenGeneratorService } from "../../services/token/tokenGeneratorService"

type LoginData = Pick<UserProps, "email" | "password">

export class DbSigninUseCase {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly hashComparer: HashComparerService,
        private readonly tokenGenerator: TokenGeneratorService
    ) {}
    public async execute(loginData: LoginData): Promise<string | null> {
        const { email, password } = loginData
        const foundUser = await this.findUserByEmailRepository.findByEmail(email)

        if (foundUser) {
            const foundUserProps = foundUser.toJSON()
            const isPasswordCorrect = await this.hashComparer.compare(
                password,
                foundUserProps.password
            )

            if (isPasswordCorrect) {
                const sessionToken = await this.tokenGenerator.generate({
                    id: foundUserProps.id,
                    sessionType: "authenticated"
                })

                return sessionToken
            }
        }

        return null
    }
}
