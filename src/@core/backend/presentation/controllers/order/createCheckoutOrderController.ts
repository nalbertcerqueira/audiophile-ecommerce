import { CreateCheckoutOrderUseCase } from "@/@core/backend/domain/usecases/order/dbCreateCheckoutOrderUseCase"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"

export class CreateCheckoutOrderController implements Controller {
    constructor(private readonly createCheckoutOrderUseCase: CreateCheckoutOrderUseCase) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { costumer } = request.body
            const userId = request.user?.id
            const userType = request.user?.type

            await this.createCheckoutOrderUseCase.execute(
                { id: userId!, type: userType! },
                { ...costumer }
            )

            return { statusCode: 201, data: null }
        } catch (error: any) {
            return {
                statusCode: 500,
                errors: [
                    "Sorry! 🚫 but we couldn't process your order at the moment.  Please try again later"
                ]
            }
        }
    }
}
