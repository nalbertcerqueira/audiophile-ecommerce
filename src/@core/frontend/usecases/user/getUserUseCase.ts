import {
    DefaultUser,
    GetUserGateway,
    GuestUser
} from "../../domain/gateways/user/getUserGateway"

type GetUserOutputDTO = DefaultUser | GuestUser | string

export class GetUserUseCase {
    constructor(private readonly getUserGateway: GetUserGateway) {}

    public async execute(): Promise<GetUserOutputDTO> {
        const foundUser = await this.getUserGateway.getUser()

        return foundUser
    }
}
