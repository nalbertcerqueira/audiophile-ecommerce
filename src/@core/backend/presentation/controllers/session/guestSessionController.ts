import { DbGuestSessionUseCase } from "@/@core/backend/domain/usecases/auth/guestUser/dbGuestSessionUseCase"
import { Controller } from "../../protocols/controller"
import { HttpResponse } from "../../protocols/http"

export class GuestSessionController implements Controller {
    constructor(private readonly guestSessionUseCase: DbGuestSessionUseCase) {}

    public async handle(): Promise<HttpResponse> {
        try {
            const { token } = await this.guestSessionUseCase.execute()
            return { statusCode: 200, data: token }
        } catch (error: any) {
            return { statusCode: 500, errors: [error.message] }
        }
    }
}
