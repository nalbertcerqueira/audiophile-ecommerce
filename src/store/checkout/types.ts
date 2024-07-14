import { CheckoutOrderProps } from "@/@core/shared/entities/order/checkoutOrder"
import { Taxes } from "@/@core/shared/entities/order/checkoutOrder"

export type CheckoutStatus = "idle" | "loading" | "settled"

export interface Order extends Omit<CheckoutOrderProps, "customer"> {
    grandTotal: number
}

export interface CheckoutState {
    taxes: {
        data: Taxes
        status: CheckoutStatus
    }
    order: {
        data: Order | null
        status: CheckoutStatus
    }
}
