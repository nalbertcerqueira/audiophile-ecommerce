import { Controller } from "../../../protocols/controller"
import { badRequestError, notFoundError, serverError } from "../../../helpers/errors"
import { DbUpdateUserUseCase } from "@/@core/backend/domain/usecases/user/dbUpdateUserUseCase"
import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"
import { HttpRequest, HttpResponse } from "../../../protocols/http"

export class UpdateUserProfileController implements Controller {
    constructor(
        private readonly updateUserCaseCase: DbUpdateUserUseCase,
        private readonly schemaValidator: SchemaValidatorService
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const userId = request.user?.id
        const userType = request.user?.type
        const body = request.body

        try {
            const validationResult = await this.schemaValidator.validate(body)

            if (!validationResult.isValid) {
                return badRequestError(validationResult.errors)
            }

            const updateUser = await this.updateUserCaseCase.execute({
                id: userId,
                type: userType,
                ...body
            })

            if (!updateUser) {
                return notFoundError(`user with id: ${userId} not found`)
            }

            return { statusCode: 200, data: updateUser }
        } catch (error: any) {
            console.log(error.message)
            return serverError()
        }
    }
}
