import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { Taxes, CheckoutOrderProps } from "@/@core/shared/entities/order/checkoutOrder"
import { SetStateAction } from "react"

export interface CheckoutStatus {
    isLoadingTaxes: boolean
    isCheckingOut: boolean
}

export interface Order extends Pick<CheckoutOrderProps, "orderId"> {
    cartItems: CartProduct[]
    grandTotal: number
}

export interface CheckoutContextProps {
    taxes: Taxes
    order: Order | null
    checkoutStatus: CheckoutStatus
    updateTaxes: () => Promise<void>
    createOrder: (withToast?: boolean) => Promise<void>
    setCheckoutStatus: (state: SetStateAction<CheckoutStatus>) => void
}
