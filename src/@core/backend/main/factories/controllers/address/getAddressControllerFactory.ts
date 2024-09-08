import { DbGetAddressUseCase } from "@/@core/backend/domain/usecases/address/dbGetAddressUseCase"
import { GetAddressController } from "@/@core/backend/presentation/controllers/address/getAddressController"
import { mongoAddressRepository } from "../../repositories/addressRepositoryFactory"

function createGetAddressController() {
    const dbGetAddressUseCase = new DbGetAddressUseCase(mongoAddressRepository)

    return new GetAddressController(dbGetAddressUseCase)
}

export const getAddressController = createGetAddressController()
