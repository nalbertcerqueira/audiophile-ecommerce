import { UserProps, User } from "../../entities/user"
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
    public async execute(userData: UserData): Promise<User | null> {
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
            const addedUser = await this.addUserRepository.add(newUser)

            return addedUser
        }

        return null
    }
}
