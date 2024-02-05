import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { DbAddUserUseCase } from "@/@core/backend/domain/usecases/user/dbAddUserUseCase"
import { Controller } from "../../protocols/controller"
import { serverError } from "../../helpers/errors"

export class SignupController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly addUserUseCase: DbAddUserUseCase
    ) {}

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const validationResult = await this.schemaValidator.validate(request.body)

        if (!validationResult.isValid) {
            return { statusCode: 400, errors: validationResult.errors }
        }

        try {
            const { name, email, password } = validationResult.data
            const createdUser = await this.addUserUseCase.execute({ name, email, password })
            if (!createdUser) {
                return {
                    statusCode: 409,
                    errors: [`user with email ${email} is already registered`]
                }
            }

            return { statusCode: 201, data: null }
        } catch (error: any) {
            return serverError()
        }
    }
}
