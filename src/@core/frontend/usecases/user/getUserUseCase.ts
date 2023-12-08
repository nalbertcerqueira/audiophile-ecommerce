import { UserProps } from "@/@core/shared/entities/user/user"
import { GetUserGateway } from "../../domain/gateways/user/getUserGateway"

type GetUserOutputDTO = Pick<UserProps, "name" | "email">

export class GetUserUseCase {
    constructor(private readonly getUserGateway: GetUserGateway) {}

    public async execute(): Promise<GetUserOutputDTO | null> {
        const foundUser = await this.getUserGateway.getUser()

        return foundUser
    }
}
