import { LocalStorageCartItemGateway } from "../../infra/gateways/localStorageCartItemGateway"

export function createLocalStorageCartGateway(cartKey: string) {
    return new LocalStorageCartItemGateway(cartKey)
}

export const localStorageCartItemGateway = createLocalStorageCartGateway("cart")
