import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { DbSigninUseCase } from "@/@core/backend/domain/usecases/auth/authenticatedUser/dbSigninUseCase"
import { DbGuestAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/guestUser/dbGuestAuthorizationUseCase"
import { TokenDecoderService } from "@/@core/backend/domain/services/token/tokenDecoderService"
import { DbAddProductsToCartUseCase } from "@/@core/backend/domain/usecases/cart/dbAddProductsToCartUseCase"
import { DbClearCartUseCase } from "@/@core/backend/domain/usecases/cart/dbClearCartUseCase"
import { DbGetCartUseCase } from "@/@core/backend/domain/usecases/cart/dbGetCartUseCase"

export class SigninController {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly tokenDecorder: TokenDecoderService,
        private readonly singinUseCase: DbSigninUseCase,
        private readonly guestAuthorizationUseCase: DbGuestAuthorizationUseCase,
        private readonly getCartUseCase: DbGetCartUseCase,
        private readonly addProductsUseCase: DbAddProductsToCartUseCase,
        private readonly clearCartUseCase: DbClearCartUseCase
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const sessionToken = request.headers?.authorization?.split(" ")[1] as string
        const validationResult = await this.schemaValidator.validate(request.body)

        if (!validationResult.isValid) {
            return { statusCode: 400, errors: validationResult.errors }
        }

        try {
            const { email, password } = validationResult.data
            const token = await this.singinUseCase.execute({ email, password })

            if (!token) {
                return {
                    statusCode: 401,
                    errors: ["Invalid email or password"],
                    headers: {
                        "WWW-Authenticate": 'Bearer realm="protected resource"'
                    }
                }
            }

            const user = this.tokenDecorder.decode(token)
            const guestUser = await this.guestAuthorizationUseCase.execute(sessionToken)

            if (user && guestUser) {
                const guestCart = await this.getCartUseCase.execute(guestUser.id, "guest")
                const guestCartItems = guestCart.toJSON().items

                if (guestCartItems.length) {
                    const { id, sessionType } = user
                    const itemsToAdd = guestCartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))

                    await this.addProductsUseCase.execute(
                        { id, type: sessionType },
                        itemsToAdd
                    )
                    await this.clearCartUseCase.execute(guestUser.id, "guest")
                }
            }

            return { statusCode: 200, data: token }
        } catch (error: any) {
            return { statusCode: 500, errors: [error.message] }
        }
    }
}
