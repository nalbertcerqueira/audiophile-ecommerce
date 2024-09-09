import { UpdateAddressUseCase } from "@/@core/frontend/usecases/address/updateAddressUseCase"
import { httpAddressGateway } from "../../gateways/addressGatewayFactory"

function createUpdateAddressUseCase() {
    return new UpdateAddressUseCase(httpAddressGateway)
}

export const updateAddressUseCase = createUpdateAddressUseCase()
