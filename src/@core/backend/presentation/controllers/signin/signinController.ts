import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { DbSigninUseCase } from "@/@core/backend/domain/usecases/auth/authenticatedUser/dbSigninUseCase"
import { DbGuestAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/guestUser/dbGuestAuthorizationUseCase"
import { TokenDecoderService } from "@/@core/backend/domain/services/token/tokenDecoderService"
import { DbAddProductsToCartUseCase } from "@/@core/backend/domain/usecases/cart/dbAddProductsToCartUseCase"
import { DbClearCartUseCase } from "@/@core/backend/domain/usecases/cart/dbClearCartUseCase"
import { DbGetCartUseCase } from "@/@core/backend/domain/usecases/cart/dbGetCartUseCase"
import { Controller } from "../../protocols/controller"

export class SigninController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly tokenDecoder: TokenDecoderService,
        private readonly signinUseCase: DbSigninUseCase,
        private readonly guestAuthorizationUseCase: DbGuestAuthorizationUseCase,
        private readonly getCartUseCase: DbGetCartUseCase,
        private readonly addProductsUseCase: DbAddProductsToCartUseCase,
        private readonly clearCartUseCase: DbClearCartUseCase
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        //Access token do usuário convidado
        const accessToken = request.headers?.authorization?.split(" ")[1] as string
        const validationResult = await this.schemaValidator.validate(request.body)

        if (!validationResult.isValid) {
            return { statusCode: 400, errors: validationResult.errors }
        }

        try {
            const { email, password } = validationResult.data
            const token = await this.signinUseCase.execute({ email, password })

            if (!token) {
                return {
                    statusCode: 401,
                    errors: ["Invalid email or password"]
                }
            }

            const payload = this.tokenDecoder.decode(token)
            const guestUser = await this.guestAuthorizationUseCase.execute(accessToken)

            if (payload && guestUser) {
                //Obtendo o carrinho de compras do usuário convidado (sessão anônima)
                //para transferir para o usuário comum ou externo após o login
                const guestCart = await this.getCartUseCase.execute(guestUser.id, "guest")
                const guestCartItems = guestCart.toJSON().items

                if (guestCartItems.length) {
                    const { id, sessionType } = payload
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
