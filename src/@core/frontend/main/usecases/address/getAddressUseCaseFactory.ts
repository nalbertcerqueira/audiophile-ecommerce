import { GetAddressUseCase } from "@/@core/frontend/usecases/address/getAddressUseCase"
import { httpAddressGateway } from "../../gateways/addressGatewayFactory"

function createGetAddressUseCase() {
    return new GetAddressUseCase(httpAddressGateway)
}

export const getAddressUseCase = createGetAddressUseCase()
