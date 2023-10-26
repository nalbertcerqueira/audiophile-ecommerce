import { LocalStorageCartGateway } from "../../infra/gateways/localStorageCartGateway"

function createLocalStorageCartGateway(cartKey: string) {
    return new LocalStorageCartGateway(cartKey)
}

export const localStorageCartGateway = createLocalStorageCartGateway("cart")
