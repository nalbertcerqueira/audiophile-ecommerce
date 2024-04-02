"use client"

import { SummarySkeleton } from "@/components/shared/loaders/skeletons/SummarySkeleton"
import { SummaryField } from "@/components/shared/cart/SummaryField"
import { useAppSelector } from "@/libs/redux/hooks"
import { selectCart } from "@/store/cart/cartSlice"

export function SummaryFields() {
    const taxes = useAppSelector((state) => state.checkout.taxes)
    const cart = useAppSelector(selectCart)
    const isCartBusy = cart.status.state !== "settled" || cart.status.busyProducts.length > 0
    const grandTotal = taxes.data.vat + taxes.data.shipping + cart.totalSpent

    if (taxes.status !== "settled" || isCartBusy) {
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
                    ariaLabel={`shipping tax of: ${taxes.data.shipping} dollars`}
                    name="SHIPPING"
                    value={taxes.data.shipping}
                />
                <SummaryField
                    ariaLabel={`vat tax of: ${taxes.data.vat} dollars`}
                    name="VAT (INCLUDED)"
                    value={taxes.data.vat}
                />
            </div>
            <div className="summary__grand-total">
                <SummaryField
                    ariaLabel={`grand total of: ${grandTotal} dollars`}
                    name="GRAND TOTAL"
                    value={grandTotal}
                />
            </div>
        </div>
    )
}
