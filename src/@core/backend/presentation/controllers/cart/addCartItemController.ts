import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { DbAddCartItemUseCase } from "@/@core/backend/domain/usecases/cart/dbAddCartItemUseCase"
import { Controller } from "../../protocols/controller"

export class AddCartItemController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly addCartItemUseCase: DbAddCartItemUseCase
    ) {}
    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const validationResult = await this.schemaValidator.validate(request.body)

        if (!validationResult.isValid) {
            return { statusCode: 400, errors: validationResult.errors }
        }

        try {
            const { productId, quantity } = request.body
            const userId = request.user?.id
            const userType = request.user?.type

            const cart = await this.addCartItemUseCase.execute(
                { id: userId!, type: userType! },
                { productId, quantity }
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
