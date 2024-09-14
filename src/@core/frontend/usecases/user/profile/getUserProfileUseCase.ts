import { GetUserProfileGateway } from "@/@core/frontend/domain/gateways/user/profile/getUserProfileGateway"
import { DefaultUser, GuestUser } from "../../../domain/gateways/user/profile/protocols"

export type GetUserProfileOutputDTO = DefaultUser | GuestUser

export class GetUserUseProfileUseCase {
    constructor(private readonly getUserProfileGateway: GetUserProfileGateway) {}

    public async execute(): Promise<GetUserProfileOutputDTO> {
        const foundUser = await this.getUserProfileGateway.getProfile()

        return foundUser
    }
}
