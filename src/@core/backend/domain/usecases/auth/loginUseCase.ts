import { UserProps } from "@/@core/shared/entities/user/user"
import { FindUserByEmailRepository } from "../../repositories/user/findUserByEmailRepository"
import { HashComparerService } from "../../services/hashComparerService"
import { TokenGeneratorService } from "../../services/tokenGeneratorService"

type LoginData = Pick<UserProps, "email" | "password">

export class LoginUseCase {
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
                const payload = { id: foundUserProps.id }
                const accessToken = await this.tokenGenerator.generate(payload)

                return accessToken
            }
        }

        return null
    }
}
