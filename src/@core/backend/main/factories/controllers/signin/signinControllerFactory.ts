import { ZodSigninValidator } from "@/@core/backend/infra/services/validators/signin/zodSigninValidator"
import { SigninController } from "@/@core/backend/presentation/controllers/signin/signinController"
import { authenticatedJwtTokenService } from "../../services/tokenServiceFactory"
import { DbSigninUseCase } from "@/@core/backend/domain/usecases/auth/authenticatedUser/dbSigninUseCase"
import { mongoUserRepository } from "../../repositories/userRepositoryFactory"
import { bcryptEncrypterService } from "../../services/encrypterServiceFactory"
import { dbGuestAuthorizationUseCase } from "../../usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { dbAddProductsToCartUseCase } from "../../usecases/cart/dbAddProductsToCartFactory"
import { dbClearCartUseCase } from "../../usecases/cart/dbClearCartFactory"
import { dbGetCartUseCase } from "../../usecases/cart/dbGetCartFactory"

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
        dbAddProductsToCartUseCase,
        dbClearCartUseCase
    )
}

export const singinController = createSigninController()
