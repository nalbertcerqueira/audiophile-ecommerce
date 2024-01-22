import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"

export interface createCheckoutOrderGateway {
    create(): Promise<CheckoutOrder>
}
