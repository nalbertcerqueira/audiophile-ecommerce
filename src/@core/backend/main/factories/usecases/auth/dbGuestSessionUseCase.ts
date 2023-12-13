import { DbGuestSessionUseCase } from "@/@core/backend/domain/usecases/auth/dbGuestSessionUseCase"
import { jwtTokenService } from "../../services/tokenServiceFactory"
import { uuidGeneratorService } from "../../services/idGeneratorServiceFactory"

function createDbGuestSessionUseCase() {
    return new DbGuestSessionUseCase(uuidGeneratorService, jwtTokenService)
}

export const dbGuestSessionUseCase = createDbGuestSessionUseCase()
