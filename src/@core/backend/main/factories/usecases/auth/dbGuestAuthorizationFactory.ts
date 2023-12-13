import { DbGuestAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/dbGuestAuthorizationUseCase"
import { guestJwtTokenService } from "../../services/tokenServiceFactory"

function createDbGuestAuthorizationUseCase() {
    return new DbGuestAuthorizationUseCase(guestJwtTokenService)
}

export const dbGuestAuthorizationUseCase = createDbGuestAuthorizationUseCase()
