import { authenticatedJwtTokenService } from "../../services/tokenServiceFactory"
import { dbGuestAuthorizationUseCase } from "../../usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { dbMoveCartItemsUseCase } from "../../usecases/cart/dbMoveCartItemsFactory"
import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"
import { mongoUserRepository } from "../../repositories/userRepositoryFactory"
import { ZodSigninValidator } from "@/@core/backend/infra/services/validators/signin/zodSigninValidator"
import { dbGetCartUseCase } from "../../usecases/cart/dbGetCartFactory"
import { SigninController } from "@/@core/backend/presentation/controllers/signin/signinController"
import { DbSigninUseCase } from "@/@core/backend/domain/usecases/auth/authenticatedUser/dbSigninUseCase"

function createSigninController() {
    const zodSigninValidator = new ZodSigninValidator()

    const dbSigninUseCase = new DbSigninUseCase(
        mongoUserRepository,
        bcryptEncrypterService,
        authenticatedJwtTokenService
    )

    return new SigninController(
        zodSigninValidator,
        authenticatedJwtTokenService,
        dbSigninUseCase,
        dbGuestAuthorizationUseCase,
        dbGetCartUseCase,
        dbMoveCartItemsUseCase
    )
}

export const signinController = createSigninController()
