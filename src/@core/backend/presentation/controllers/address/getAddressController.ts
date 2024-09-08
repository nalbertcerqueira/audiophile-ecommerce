import { Controller } from "../../protocols/controller"
import { serverError } from "../../helpers/errors"
import { DbGetAddressUseCase } from "@/@core/backend/domain/usecases/address/dbGetAddressUseCase"
import { HttpRequest, HttpResponse } from "../../protocols/http"

export class GetAddressController implements Controller {
    constructor(private readonly getAddressUseCase: DbGetAddressUseCase) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const userId = request.user?.id
        const userType = request.user?.type

        try {
            const address = await this.getAddressUseCase.execute({
                id: userId!,
                type: userType!
            })

            return { statusCode: 200, data: address?.toJSON() || null }
        } catch (error: any) {
            return serverError()
        }
    }
}
