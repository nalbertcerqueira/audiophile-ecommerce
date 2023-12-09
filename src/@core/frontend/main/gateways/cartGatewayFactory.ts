import { HttpCartGateway } from "../../infra/gateways/cart/httpCartGateway"
import { LocalStorageCartGateway } from "../../infra/gateways/cart/localStorageCartGateway"

function createLocalStorageCartGateway(cartKey: string) {
    return new LocalStorageCartGateway(cartKey)
}

function createHttpCartGateway(apiUrl: string) {
    return new HttpCartGateway(apiUrl)
}

export const localStorageCartGateway = createLocalStorageCartGateway("cart")

export const httpCartGateway = createHttpCartGateway("/api/auth")
