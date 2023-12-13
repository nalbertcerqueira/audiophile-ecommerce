import { DbGuestSessionUseCase } from "@/@core/backend/domain/usecases/auth/dbGuestSessionUseCase"
import { guestJwtTokenService } from "../../services/tokenServiceFactory"
import { uuidGeneratorService } from "../../services/idGeneratorServiceFactory"

function createDbGuestSessionUseCase() {
    return new DbGuestSessionUseCase(uuidGeneratorService, guestJwtTokenService)
}

export const dbGuestSessionUseCase = createDbGuestSessionUseCase()
