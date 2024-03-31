import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { CheckoutOrderProps } from "@/@core/shared/entities/order/checkoutOrder"
import { Taxes } from "@/@core/shared/entities/order/checkoutOrder"

export type CheckoutStatus = "idle" | "loading"

export interface Order extends Pick<CheckoutOrderProps, "orderId"> {
    grandTotal: number
    items: CartProduct[]
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
