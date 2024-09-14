import { DbUpdateAddressUseCase } from "@/@core/backend/domain/usecases/address/dbUpdateAddressUseCase"
import { Controller } from "../../protocols/controller"
import { HttpRequest, HttpResponse } from "../../protocols/http"
import { badRequestError, notFoundError, serverError } from "../../helpers/errors"
import { SchemaValidatorService } from "@/@core/backend/domain/services/schemaValidator"

export class UpdateAddressController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly updateAddressUseCase: DbUpdateAddressUseCase
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

            const address = await this.updateAddressUseCase.execute({
                user: { id: userId!, type: userType! },
                addressData: { ...body }
            })

            if (!address) {
                return notFoundError(`user with id: ${userId} not found`)
            }

            return { statusCode: 200, data: address.toJSON() }
        } catch (error: any) {
            console.log(error.message)
            return serverError()
        }
    }
}
