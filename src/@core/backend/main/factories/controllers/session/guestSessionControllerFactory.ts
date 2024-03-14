import { DbGuestSessionUseCase } from "@/@core/backend/domain/usecases/auth/guestUser/dbGuestSessionUseCase"
import { GuestSessionController } from "@/@core/backend/presentation/controllers/session/guestSessionController"
import { guestJwtTokenService } from "../../services/tokenServiceFactory"
import { uuidGeneratorService } from "../../services/idGeneratorServiceFactory"

function createGuestSessionController() {
    const dbGuestSessionUseCase = new DbGuestSessionUseCase(
        uuidGeneratorService,
        guestJwtTokenService
    )

    return new GuestSessionController(dbGuestSessionUseCase)
}

export const guestSessionController = createGuestSessionController()
