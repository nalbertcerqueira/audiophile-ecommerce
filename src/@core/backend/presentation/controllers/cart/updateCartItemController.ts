import { DbUpdateCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbUpdateCartItemUseCase"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"
import { badRequestError, notFoundError, serverError } from "../../helpers/errors"

export class UpdateCartItemController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly updateCartItemUseCase: DbUpdateCartItemUseCase
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const validationResult = await this.schemaValidator.validate(request.body)

        if (!validationResult.isValid) {
            return badRequestError(validationResult.errors)
        }

        try {
            const userId = request.user?.id
            const userType = request.user?.type
            const productId = request.params?.id

            const cart = await this.updateCartItemUseCase.execute({
                user: { id: userId!, type: userType! },
                item: { productId: productId!, quantity: validationResult.data.quantity }
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
