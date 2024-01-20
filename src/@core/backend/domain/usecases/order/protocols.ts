import { CheckoutOrderProps } from "@/@core/shared/entities/order/checkoutOrder"

export type CheckoutInfo = Pick<CheckoutOrderProps, "costumer" | "cartItems">
