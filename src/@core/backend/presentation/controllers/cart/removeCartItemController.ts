import { HttpRequest, HttpResponse } from "../../protocols/http"
import { DbRemoveCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbRemoveCartItemUseCase"
import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"
import { Controller } from "../../protocols/controller"
import { badRequestError, notFoundError, serverError } from "../../helpers/errors"

export class RemoveCartItemController implements Controller {
    constructor(
        private readonly removeCartItemUseCase: DbRemoveCartItemUseCase,
        private readonly schemaValidator: SchemaValidatorService
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const userId = request.user?.id
        const userType = request.user?.type
        const productId = request.params?.id

        const validationResult = await this.schemaValidator.validate(request.body)
        if (!validationResult.isValid) {
            return badRequestError(validationResult.errors)
        }

        try {
            const cart = await this.removeCartItemUseCase.execute({
                user: { id: userId!, type: userType! },
                productId: productId!,
                quantity: validationResult.data.quantity
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
