import { DbGuestSessionUseCase } from "@/@core/backend/domain/usecases/auth/guestUser/dbGuestSessionUseCase"
import { guestJwtTokenService } from "../../../services/tokenServiceFactory"
import { uuidGeneratorService } from "../../../services/idGeneratorServiceFactory"

function createDbGuestSessionUseCase(): DbGuestSessionUseCase {
    return new DbGuestSessionUseCase(uuidGeneratorService, guestJwtTokenService)
}

export const dbGuestSessionUseCase = createDbGuestSessionUseCase()
