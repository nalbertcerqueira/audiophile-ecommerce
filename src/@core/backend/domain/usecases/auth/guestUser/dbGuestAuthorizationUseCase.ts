import { TokenVerifierService } from "../../../services/token/tokenVerifierService"
import { GuestAuthorizationOutputDTO } from "./guestAuthDTOs"

export class DbGuestAuthorizationUseCase {
    constructor(private readonly tokenVerifierService: TokenVerifierService) {}

    public async execute(token: string): Promise<GuestAuthorizationOutputDTO> {
        const payload = await this.tokenVerifierService.verify(token)

        if (!payload || payload.sessionType !== "guest") {
            return null
        }

        return { id: payload.id }
    }
}
