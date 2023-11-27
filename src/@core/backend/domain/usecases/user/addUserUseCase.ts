import { UserProps } from "@/@core/shared/entities/user/user"
import { AddUserRepository } from "../../repositories/user/addUserRepository"
import { FindUserByEmailRepository } from "../../repositories/user/findUserByEmailRepository"
import { HashService } from "../../services/hashService"

type UserData = Pick<UserProps, "email" | "name" | "password">
type CreateUserOutputDTO = Pick<UserProps, "id" | "name" | "email">

export class AddUserUseCase {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly addUserRepository: AddUserRepository,
        private readonly hashService: HashService
    ) {}
    public async execute(userData: UserData): Promise<CreateUserOutputDTO | null> {
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
            const addedUser = (await this.addUserRepository.add(newUser)).toJSON()

            return { id: addedUser.id, name: addedUser.name, email: addedUser.email }
        }

        return null
    }
}
