import { DbUpdateAddressUseCase } from "@/@core/backend/domain/usecases/address/dbUpdateAddressUseCase"
import { mongoAddressRepository } from "../../repositories/addressRepositoryFactory"
import { UpdateAddressController } from "@/@core/backend/presentation/controllers/address/updateAddressController"
import { addressZodSchema } from "@/@core/shared/entities/address/utils"
import { ZodSchemaValidator } from "@/@core/backend/infra/services/zodSchemaValidator"

function createUpdateAddressController() {
    const zodAddressValidator = new ZodSchemaValidator(addressZodSchema)
    const dbUpdateAddressUseCase = new DbUpdateAddressUseCase(mongoAddressRepository)

    return new UpdateAddressController(zodAddressValidator, dbUpdateAddressUseCase)
}

export const updateAddressController = createUpdateAddressController()
