"use client"

import { RingLoader } from "@/components/shared/loaders/RingLoader"
import { ReactNode } from "react"
import { useAppSelector } from "@/libs/redux/hooks"
import { selectOrderStatus, selectTaxesStatus } from "@/store/checkout/"
import {
    selectBusyProductsLength,
    selectCartItemsLength,
    selectCartStatus
} from "@/store/cart"
import { PrimaryButton } from "@/components/shared/buttons/PrimaryButton"

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
            <PrimaryButton
                ariaLabel="continue and pay"
                ariaDisabled={submitBlocked}
                disabled={submitBlocked}
                formId={formId}
                type="submit"
                className="summary__submit-btn"
            >
                {isCheckingOut && (
                    <div className="btn-overlay">
                        <RingLoader />
                    </div>
                )}
                CONTINUE & PAY
            </PrimaryButton>
        </div>
    )
}
