import { UserProps } from "@/@core/shared/entities/user/user"
import { AddUserRepository } from "../../repositories/user/addUserRepository"
import { FindUserByEmailRepository } from "../../repositories/user/findUserByEmailRepository"
import { HashService } from "../../services/hashService"

type UserData = Pick<UserProps, "email" | "name" | "password">

export class AddUserUseCase {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly addUserRepository: AddUserRepository,
        private readonly hashService: HashService
    ) {}
    public async execute(userData: UserData): Promise<boolean> {
        const { email, name, password } = userData
        const foundUser = await this.findUserByEmailRepository.findByEmail(email)

        if (!foundUser) {
            const hashedPassword = await this.hashService.hash(password)
            const newUser = {
                name,
                email,
                password: hashedPassword,
                images: { profile: null, profileThumb: null }
            }
            await this.addUserRepository.add(newUser)

            return true
        }

        return false
    }
}
