"use client"

import { CartContext } from "@/contexts/cartContext/CartContext"
import { CheckoutContext } from "@/contexts/checkoutContext/CheckoutContext"
import { RingLoader } from "@/components/shared/loaders/RingLoader"
import { ReactNode, useContext } from "react"

interface SummaryRootProps {
    formId: string
    children: ReactNode
}

export function SummaryRoot({ formId, children }: SummaryRootProps) {
    const { cartStatus, cart } = useContext(CartContext)
    const { checkoutStatus } = useContext(CheckoutContext)

    function shouldPreventSubmit() {
        const { isCheckingOut, isLoadingTaxes } = checkoutStatus
        const isCartEmpty = !cart.items.length
        const isCartBusy = cartStatus.isLoading

        return isCartEmpty || isCartBusy || isLoadingTaxes || isCheckingOut
    }

    return (
        <div className="summary">
            <h2 className="summary__title">SUMMARY</h2>
            {children}
            <button
                aria-label="continue and pay"
                aria-disabled={shouldPreventSubmit()}
                disabled={shouldPreventSubmit()}
                form={formId}
                type="submit"
                className="btn btn--primary summary__submit-btn"
            >
                {checkoutStatus.isCheckingOut && (
                    <div className="btn-overlay">
                        <RingLoader />
                    </div>
                )}
                CONTINUE & PAY
            </button>
        </div>
    )
}
