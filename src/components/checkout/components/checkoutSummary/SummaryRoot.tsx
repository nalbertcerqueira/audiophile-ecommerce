"use client"

import { RingLoader } from "@/components/shared/loaders/RingLoader"
import { ReactNode } from "react"
import { useAppSelector } from "@/libs/redux/hooks"
import { selectOrderStatus, selectTaxesStatus } from "@/store/checkout/checkoutSlice"
import {
    selectBusyProductsLength,
    selectCartItemsLength,
    selectCartStatus
} from "@/store/cart/cartSlice"

interface SummaryRootProps {
    formId: string
    children: ReactNode
}

export function SummaryRoot({ formId, children }: SummaryRootProps) {
    const cartStatus = useAppSelector(selectCartStatus)
    const busyProductsLength = useAppSelector(selectBusyProductsLength)

    const isCartBusy = cartStatus !== "settled" || busyProductsLength > 0
    const isCartEmpty = useAppSelector(selectCartItemsLength) === 0
    const isCheckingOut = useAppSelector(selectOrderStatus) === "loading"
    const isLoadingTaxes = useAppSelector(selectTaxesStatus) !== "settled"

    const submitBlocked = isCartEmpty || isCartBusy || isLoadingTaxes || isCheckingOut

    return (
        <div className="summary">
            <h2 className="summary__title">SUMMARY</h2>
            {children}
            <button
                aria-label="continue and pay"
                aria-disabled={submitBlocked}
                disabled={submitBlocked}
                form={formId}
                type="submit"
                className="btn btn--primary summary__submit-btn"
            >
                {isCheckingOut && (
                    <div className="btn-overlay">
                        <RingLoader />
                    </div>
                )}
                CONTINUE & PAY
            </button>
        </div>
    )
}
