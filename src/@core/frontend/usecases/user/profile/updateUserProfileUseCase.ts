import { UpdateUserProfileGateway } from "@/@core/frontend/domain/gateways/user/profile/updateUserProfileGateway"
import { UserProps } from "@/@core/shared/entities/user/user"
import { DefaultUser } from "@/@core/frontend/domain/gateways/user/profile/protocols"

export interface UpdateUserProfileInputDTO
    extends Omit<UserProps, "email" | "phone" | "profileImg" | "password"> {
    phone: NonNullable<UserProps["phone"]>
    profileImg?: File
}

export class UpdateUserProfileUseCase {
    constructor(private readonly updateUserProfileGateway: UpdateUserProfileGateway) {}

    public async execute(data: UpdateUserProfileInputDTO): Promise<DefaultUser> {
        const updatedUser = await this.updateUserProfileGateway.update(data)
        return updatedUser
    }
}
