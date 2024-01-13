import { DbGuestSessionUseCase } from "@/@core/backend/domain/usecases/auth/guestUser/dbGuestSessionUseCase"
import { UuidGeneratorService } from "@/@core/backend/infra/services/uuidGeneratorService"
import { GuestSessionController } from "@/@core/backend/presentation/controllers/session/guestSessionController"
import { guestJwtTokenService } from "../../services/tokenServiceFactory"

function createGuestSessionController() {
    const uuidGeneratorService = new UuidGeneratorService()
    const dbGuestSessionUseCase = new DbGuestSessionUseCase(
        uuidGeneratorService,
        guestJwtTokenService
    )

    return new GuestSessionController(dbGuestSessionUseCase)
}

export const guestSessionController = createGuestSessionController()
