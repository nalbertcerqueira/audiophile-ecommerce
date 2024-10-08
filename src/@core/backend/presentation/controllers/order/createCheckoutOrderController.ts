import { DbCreateCheckoutOrderUseCase } from "@/@core/backend/domain/usecases/order/dbCreateCheckoutOrderUseCase"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { badRequestError, serverError } from "../../helpers/errors"

export class CreateCheckoutOrderController implements Controller {
    constructor(private readonly createCheckoutOrderUseCase: DbCreateCheckoutOrderUseCase) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { customer } = request.body
            const userId = request.user?.id
            const userType = request.user?.type

            const order = await this.createCheckoutOrderUseCase.execute({
                user: { id: userId!, type: userType! },
                customer
            })

            if (!order) {
                return badRequestError(["Cannot place a order with empty cart"])
            }

            return { statusCode: 200, data: order.toJSON() }
        } catch (error: any) {
            return serverError(
                "Sorry! but we couldn't process your order at the moment. Please try again later"
            )
        }
    }
}
