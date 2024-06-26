import { HttpRequest, HttpResponse } from "../../protocols/http"
import { DbGetCartUseCase } from "@/@core/backend/domain/usecases/cart/dbGetCartUseCase"
import { Controller } from "../../protocols/controller"
import { serverError } from "../../helpers/errors"

export class GetCartController implements Controller {
    constructor(private readonly getCartUseCase: DbGetCartUseCase) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const userId = request.user?.id
        const userType = request.user?.type

        try {
            const cart = await this.getCartUseCase.execute({ id: userId!, type: userType! })
            return { statusCode: 200, data: cart.toJSON() }
        } catch (error: any) {
            return serverError()
        }
    }
}
