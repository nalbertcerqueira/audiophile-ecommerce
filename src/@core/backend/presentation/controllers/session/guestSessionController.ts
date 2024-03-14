import { DbGuestSessionUseCase } from "@/@core/backend/domain/usecases/auth/guestUser/dbGuestSessionUseCase"
import { Controller } from "../../protocols/controller"
import { HttpResponse } from "../../protocols/http"
import { serverError } from "../../helpers/errors"

export class GuestSessionController implements Controller {
    constructor(private readonly guestSessionUseCase: DbGuestSessionUseCase) {}

    public async handle(): Promise<HttpResponse> {
        try {
            const { token } = await this.guestSessionUseCase.execute()
            return { statusCode: 200, data: token }
        } catch (error: any) {
            return serverError()
        }
    }
}
