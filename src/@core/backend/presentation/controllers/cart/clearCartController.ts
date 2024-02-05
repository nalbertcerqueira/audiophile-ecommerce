import { HttpRequest, HttpResponse } from "../../protocols/http"
import { DbClearCartUseCase } from "@/@core/backend/domain/usecases/cart/dbClearCartUseCase"
import { serverError } from "../../helpers/errors"
import { Controller } from "../../protocols/controller"

export class ClearCartController implements Controller {
    constructor(private readonly clearCartUseCase: DbClearCartUseCase) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const userId = request.user?.id
        const userType = request.user?.type

        try {
            const cart = await this.clearCartUseCase.execute(userId!, userType!)
            return { statusCode: 200, data: cart.toJSON() }
        } catch (error: any) {
            return serverError()
        }
    }
}
