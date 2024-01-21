import { DbGetOrderTaxesUseCase } from "@/@core/backend/domain/usecases/order/dbGetOrderTaxesUseCase"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"

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
            return {
                statusCode: 500,
                errors: ["Something went wrong unexpectedly! Please try again later."]
            }
        }
    }
}
