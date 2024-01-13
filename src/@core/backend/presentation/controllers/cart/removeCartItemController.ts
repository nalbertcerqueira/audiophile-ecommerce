import { DbRemoveCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbRemoveCartItemUseCase"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"

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
            return { statusCode: 400, errors: validationResult.errors }
        }

        try {
            const cart = await this.removeCartItemUseCase.execute(
                { id: userId!, type: userType! },
                { quantity: validationResult.data.quantity, productId: productId! }
            )

            if (!cart) {
                return {
                    statusCode: 404,
                    errors: [`Product with id '${productId}' not found`]
                }
            }

            return { statusCode: 200, data: cart.toJSON() }
        } catch (error: any) {
            return { statusCode: 500, errors: [error.message] }
        }
    }
}
