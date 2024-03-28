"use client"

import { SummarySkeleton } from "@/components/shared/loaders/skeletons/SummarySkeleton"
import { CheckoutContext } from "@/contexts/checkoutContext/CheckoutContext"
import { SummaryField } from "@/components/shared/cart/SummaryField"
import { CartContext } from "@/contexts/cartContext/CartContext"
import { useContext } from "react"

export function SummaryFields() {
    const { taxes, checkoutStatus } = useContext(CheckoutContext)
    const { cartStatus, cart } = useContext(CartContext)

    if (checkoutStatus.isLoadingTaxes || cartStatus.isLoading) {
        return <SummarySkeleton />
    }

    return (
        <div className="summary__fields">
            <div className="summary__total-fields">
                <SummaryField
                    ariaLabel={`total of: ${cart.totalSpent} dollars`}
                    name="TOTAL"
                    value={cart.totalSpent}
                />
                <SummaryField
                    ariaLabel={`shipping tax of: ${taxes.shipping} dollars`}
                    name="SHIPPING"
                    value={taxes.shipping}
                />
                <SummaryField
                    ariaLabel={`vat tax of: ${taxes.vat} dollars`}
                    name="VAT (INCLUDED)"
                    value={taxes.vat}
                />
            </div>
            <div className="summary__grand-total">
                <SummaryField
                    ariaLabel={`grand total of: ${taxes.vat} dollars`}
                    name="GRAND TOTAL"
                    value={taxes.vat + taxes.shipping + cart.totalSpent}
                />
            </div>
        </div>
    )
}
