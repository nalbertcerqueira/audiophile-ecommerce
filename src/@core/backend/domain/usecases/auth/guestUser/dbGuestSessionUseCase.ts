import { IdGeneratorService } from "../../../services/idGeneratorService"
import { TokenGeneratorService } from "../../../services/token/tokenGeneratorService"
import { GuestSessionOutputDTO } from "./guestAuthDTOs"

//Caso de uso utilizado para gerar uma sessão anônima
export class DbGuestSessionUseCase {
    constructor(
        private readonly idGeneratorService: IdGeneratorService,
        private readonly tokenGeneratorService: TokenGeneratorService
    ) {}

    public async execute(): Promise<GuestSessionOutputDTO> {
        const guestId = this.idGeneratorService.generate()

        const accessToken = await this.tokenGeneratorService.generate({
            id: guestId,
            sessionType: "guest"
        })

        return { id: guestId, type: "guest", token: accessToken }
    }
}
