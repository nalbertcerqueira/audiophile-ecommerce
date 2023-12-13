import { TokenVerifierService } from "../../services/token/tokenVerifierService"

export class DbGuestAuthorizationUseCase {
    constructor(private readonly tokenVerifierService: TokenVerifierService) {}

    public async execute(token: string): Promise<{ id: string } | null> {
        const payload = await this.tokenVerifierService.verify(token)

        if (payload && payload.sessionType === "guest") {
            return { id: payload.id }
        }

        return null
    }
}
