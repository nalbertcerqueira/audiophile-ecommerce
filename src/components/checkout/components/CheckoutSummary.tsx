"use client"

import { CartItem } from "@/components/shared/cart/CartItem"
import { SummaryField } from "@/components/shared/cart/SummaryField"
import { CartItemSkeleton } from "@/components/shared/loaders/skeletons/CartItemSkeleton"
import { SummarySkeleton } from "@/components/shared/loaders/skeletons/SummarySkeleton"
import { CartContext } from "@/contexts/CartContext"
import { CheckoutContext } from "@/contexts/CheckoutContext"
import { RingLoader } from "@/components/shared/loaders/RingLoader"
import { useContext } from "react"

interface CheckoutSummaryProps {
    formId: string
}

export function CheckoutSummary({ formId }: CheckoutSummaryProps) {
    const { cartStatus, cart } = useContext(CartContext)
    const { checkoutStatus, taxes } = useContext(CheckoutContext)

    function shouldPreventSubmit() {
        const { isCheckingOut, isLoadingTaxes } = checkoutStatus
        const isCartEmpty = !cart.items.length
        const isCartBusy = cartStatus.isLoading

        return isCartEmpty || isCartBusy || isLoadingTaxes || isCheckingOut
    }

    function renderItems() {
        const isClearing = !cartStatus.currentProductIds.length
        const isCartBusy = cartStatus.isLoading

        if (isCartBusy && isClearing) {
            return (
                <>
                    <CartItemSkeleton />
                    <CartItemSkeleton />
                </>
            )
        }
        return cart.items.map((item) => (
            <CartItem
                key={item.productId}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                slug={item.slug}
                readOnly
            />
        ))
    }

    function renderSummaryFields() {
        const grandTotal = taxes.vat + taxes.shipping + cart.totalSpent

        if (checkoutStatus.isLoadingTaxes || cartStatus.isLoading) {
            return <SummarySkeleton />
        }

        return (
            <>
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
                        value={grandTotal}
                    />
                </div>
            </>
        )
    }

    return (
        <div className="summary">
            <h2 className="summary__title">SUMMARY</h2>
            <div className="summary__items">{renderItems()}</div>
            <div className="summary__fields">{renderSummaryFields()}</div>
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
