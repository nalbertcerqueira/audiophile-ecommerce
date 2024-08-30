import {
    DefaultUser,
    GetUserProfileGateway,
    GuestUser
} from "../../../domain/gateways/user/profile/getUserProfileGateway"

type GetUserOutputProfileDTO = DefaultUser | GuestUser | string

export class GetUserUseProfileUseCase {
    constructor(private readonly getUserProfileGateway: GetUserProfileGateway) {}

    public async execute(): Promise<GetUserOutputProfileDTO> {
        const foundUser = await this.getUserProfileGateway.getProfile()

        return foundUser
    }
}
