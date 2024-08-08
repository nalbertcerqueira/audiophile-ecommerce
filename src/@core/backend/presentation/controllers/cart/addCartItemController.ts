import { HttpRequest, HttpResponse } from "../../protocols/http"
import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"
import { DbAddCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbAddCartItemUseCase"
import { badRequestError, notFoundError, serverError } from "../../helpers/errors"
import { Controller } from "../../protocols/controller"

export class AddCartItemController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly addCartItemUseCase: DbAddCartItemUseCase
    ) {}
    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const validationResult = await this.schemaValidator.validate(request.body)

        if (!validationResult.isValid) {
            return badRequestError(validationResult.errors)
        }

        try {
            const { productId, quantity } = request.body
            const userId = request.user?.id
            const userType = request.user?.type

            const cart = await this.addCartItemUseCase.execute({
                user: { id: userId!, type: userType! },
                itemRef: { productId, quantity }
            })

            if (!cart) {
                return notFoundError(`Product with id '${productId}' not found`)
            }

            return { statusCode: 200, data: cart.toJSON() }
        } catch (error: any) {
            return serverError()
        }
    }
}
