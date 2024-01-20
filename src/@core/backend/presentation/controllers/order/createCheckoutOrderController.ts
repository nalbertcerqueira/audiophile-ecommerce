import { CreateCheckoutOrderUseCase } from "@/@core/backend/domain/usecases/order/dbCreateCheckoutOrderUseCase"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"

export class CreateCheckoutOrderController implements Controller {
    constructor(
        private readonly schemaValidatorService: SchemaValidatorService,
        private readonly createCheckoutOrderUseCase: CreateCheckoutOrderUseCase
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const validationResult = await this.schemaValidatorService.validate(request.body)

        if (!validationResult.isValid) {
            return { statusCode: 400, errors: validationResult.errors }
        }

        try {
            const { cartItems, costumer } = request.body
            const userId = request.user?.id
            const userType = request.user?.type

            await this.createCheckoutOrderUseCase.execute(
                { id: userId!, type: userType! },
                { cartItems, costumer }
            )

            return { statusCode: 201, data: null }
        } catch (error: any) {
            return { statusCode: 500, errors: [error.message] }
        }
    }
}
