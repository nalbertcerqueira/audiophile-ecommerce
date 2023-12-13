import { DbGuestAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/dbGuestAuthorizationUseCase"
import { jwtTokenService } from "../../services/tokenServiceFactory"

function createDbGuestAuthorizationUseCase() {
    return new DbGuestAuthorizationUseCase(jwtTokenService)
}

export const dbGuestAuthorizationUseCase = createDbGuestAuthorizationUseCase()
