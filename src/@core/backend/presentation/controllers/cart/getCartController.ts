import { DbGetCartUseCase } from "@/@core/backend/domain/usecases/cart/dbGetCartUseCase"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { Controller } from "../../protocols/controller"

export class GetCartController implements Controller {
    constructor(private readonly getCartUseCase: DbGetCartUseCase) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const userId = request.user?.id
        const userType = request.user?.type

        try {
            const cart = await this.getCartUseCase.execute(userId!, userType!)
            return { statusCode: 200, data: cart.toJSON() }
        } catch (error: any) {
            return { statusCode: 500, errors: [error.message] }
        }
    }
}
