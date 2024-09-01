import {
    DefaultUser,
    GetUserProfileGateway,
    GuestUser
} from "../../../domain/gateways/user/profile/getUserProfileGateway"

export type GetUserProfileOutputDTO = DefaultUser | GuestUser | string

export class GetUserUseProfileUseCase {
    constructor(private readonly getUserProfileGateway: GetUserProfileGateway) {}

    public async execute(): Promise<GetUserProfileOutputDTO> {
        const foundUser = await this.getUserProfileGateway.getProfile()

        return foundUser
    }
}
