import { UserProps } from "@/@core/shared/entities/user/user"
import { GetUserGateway } from "../../domain/gateways/user/getUserGateway"

type GetUserOutputDTO =
    | (Pick<UserProps, "id"> & Partial<Pick<UserProps, "name" | "email">>)
    | string

export class GetUserUseCase {
    constructor(private readonly getUserGateway: GetUserGateway) {}

    public async execute(): Promise<GetUserOutputDTO> {
        const foundUser = await this.getUserGateway.getUser()

        return foundUser
    }
}
