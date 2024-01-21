import { Taxes } from "@/@core/shared/entities/order/checkoutOrder"

export interface GetOrderTaxesGateway {
    getTaxes(): Promise<Taxes>
}
