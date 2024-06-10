import { DbGuestAuthorizationUseCase } from "@/@core/backend/domain/usecases/auth/guestUser/dbGuestAuthorizationUseCase"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { DbMoveCartItemsUseCase } from "@/@core/backend/domain/usecases/cart/dbMoveCartItemsUseCase"
import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"
import { TokenDecoderService } from "@/@core/backend/domain/services/token/tokenDecoderService"
import { DbGetCartUseCase } from "@/@core/backend/domain/usecases/cart/dbGetCartUseCase"
import { DbSigninUseCase } from "@/@core/backend/domain/usecases/auth/authenticatedUser/dbSigninUseCase"
import { badRequestError, serverError, unauthorizedError } from "../../helpers/errors"
import { Controller } from "../../protocols/controller"

export class SigninController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly tokenDecoder: TokenDecoderService,
        private readonly signinUseCase: DbSigninUseCase,
        private readonly guestAuthorizationUseCase: DbGuestAuthorizationUseCase,
        private readonly getCartUseCase: DbGetCartUseCase,
        private readonly dbMoveCartItemsUseCase: DbMoveCartItemsUseCase
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        //Access token do usuário convidado
        const accessToken = request.headers?.authorization?.split(" ")[1] as string
        const validationResult = await this.schemaValidator.validate(request.body)

        if (!validationResult.isValid) {
            return badRequestError(validationResult.errors)
        }

        try {
            const { email, password } = validationResult.data
            const token = await this.signinUseCase.execute({ email, password })

            if (!token) {
                return unauthorizedError("Invalid email or password")
            }

            const payload = this.tokenDecoder.decode(token)
            const guestUser = await this.guestAuthorizationUseCase.execute(accessToken)

            if (payload && guestUser) {
                //Obtendo o carrinho de compras do usuário convidado (sessão anônima)
                //para transferir para o usuário autenticado
                const { id, sessionType } = payload

                const guestCart = await this.getCartUseCase.execute(guestUser.id, "guest")
                const itemsToAdd = guestCart.toJSON().items.map(({ productId, quantity }) => ({
                    productId,
                    quantity
                }))

                await this.dbMoveCartItemsUseCase.execute({
                    from: { id: guestUser.id, type: "guest" },
                    to: { id: id, type: sessionType },
                    items: itemsToAdd
                })
            }

            return { statusCode: 200, data: token }
        } catch (error: any) {
            return serverError()
        }
    }
}
