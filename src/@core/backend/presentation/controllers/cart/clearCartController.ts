import { DbClearCartUseCase } from "@/@core/backend/domain/usecases/cart/dbClearCartUseCase"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"

export class ClearCartController implements Controller {
    constructor(private readonly clearCartUseCase: DbClearCartUseCase) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const userId = request.user?.id
        const userType = request.user?.type

        try {
            const cart = await this.clearCartUseCase.execute(userId!, userType!)
            return { statusCode: 200, data: cart.toJSON() }
        } catch (error: any) {
            return { statusCode: 500, errors: [error.message] }
        }
    }
}
