import { HttpRequest, HttpResponse } from "../../protocols/http"
import { DbGetOrderTaxesUseCase } from "@/@core/backend/domain/usecases/order/dbGetOrderTaxesUseCase"
import { Controller } from "../../protocols/controller"
import { serverError } from "../../helpers/errors"

export class GetOrderTaxesController implements Controller {
    constructor(private readonly getOrderTaxesUseCase: DbGetOrderTaxesUseCase) {}

    public async handle(req: HttpRequest): Promise<HttpResponse> {
        const userId = req.user?.id
        const userType = req.user?.type

        try {
            const taxes = await this.getOrderTaxesUseCase.execute({
                id: userId!,
                type: userType!
            })

            return { statusCode: 200, data: taxes }
        } catch (error: any) {
            return serverError(
                "Sorry, we're having some issues to update the taxes. Please try again later"
            )
        }
    }
}
