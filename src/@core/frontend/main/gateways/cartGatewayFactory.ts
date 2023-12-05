import { LocalStorageCartGateway } from "../../infra/gateways/cart/localStorageCartGateway"

function createLocalStorageCartGateway(cartKey: string) {
    return new LocalStorageCartGateway(cartKey)
}

export const localStorageCartGateway = createLocalStorageCartGateway("cart")
