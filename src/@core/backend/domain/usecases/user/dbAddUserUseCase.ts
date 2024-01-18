import { User, UserProps } from "@/@core/shared/entities/user/user"
import { AddUserRepository } from "../../repositories/user/addUserRepository"
import { FindUserByEmailRepository } from "../../repositories/user/findUserByEmailRepository"
import { HashService } from "../../services/crypto/hashService"
import { FindExternalUserByEmailRepository } from "../../repositories/externalUser/findExternalUserByEmailRepository"

type AddUserInputDTO = Pick<UserProps, "email" | "name" | "password">

export class DbAddUserUseCase {
    constructor(
        private readonly findExternalUserByEmailRepository: FindExternalUserByEmailRepository,
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly addUserRepository: AddUserRepository,
        private readonly hashService: HashService
    ) {}
    public async execute(user: AddUserInputDTO): Promise<boolean> {
        const { email, name, password } = user

        const [foundUser, foundExternalUser] = await Promise.all([
            this.findUserByEmailRepository.findByEmail(email),
            this.findExternalUserByEmailRepository.findByEmail(email)
        ])

        if (!foundUser && !foundExternalUser) {
            const hashedPassword = await this.hashService.hash(password)
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                images: { profile: null }
            })
            await this.addUserRepository.add(newUser)

            return true
        }

        return false
    }
}
