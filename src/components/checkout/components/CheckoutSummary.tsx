"use client"

import { CartItem } from "@/components/shared/cart/CartItem"
import { SummaryField } from "@/components/shared/cart/SummaryField"
import { CartItemSkeleton } from "@/components/shared/loaders/skeletons/CartItemSkeleton"
import { SummarySkeleton } from "@/components/shared/loaders/skeletons/SummarySkeleton"
import { CartContext } from "@/contexts/CartContext"
import { CheckoutContext } from "@/contexts/CheckoutContext"
import { RingLoader } from "@/components/shared/loaders/RingLoader"
import { formatCurrency } from "@/utils/helpers"
import { useContext } from "react"

interface CheckoutSummaryProps {
    formId: string
}

export function CheckoutSummary({ formId }: CheckoutSummaryProps) {
    const { loadingState: cartLoadingState, cart } = useContext(CartContext)
    const { status: checkoutStatus, taxes } = useContext(CheckoutContext)

    function shouldPreventSubmit() {
        const { isCheckingOut, isLoadingTaxes } = checkoutStatus
        const isCartEmpty = !cart.items.length
        const isCartBusy = cartLoadingState.isLoading

        return isCartEmpty || isCartBusy || isLoadingTaxes || isCheckingOut
    }

    function renderItems() {
        const isClearing = !cartLoadingState.currentProductIds.length
        const isCartBusy = cartLoadingState.isLoading

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
                productId={item.productId}
                slug={item.slug}
                readOnly
            />
        ))
    }

    function renderSummaryFields() {
        const grandTotal = taxes.vat + taxes.shipping + cart.totalSpent

        if (checkoutStatus.isLoadingTaxes || cartLoadingState.isLoading) {
            return <SummarySkeleton />
        }

        return (
            <>
                <div className="summary__total-fields">
                    <SummaryField name="TOTAL" value={formatCurrency(cart.totalSpent)} />
                    <SummaryField name="SHIPPING" value={formatCurrency(taxes.shipping)} />
                    <SummaryField name="VAT (INCLUDED)" value={formatCurrency(taxes.vat)} />
                </div>
                <div className="summary__grand-total">
                    <SummaryField name="GRAND TOTAL" value={formatCurrency(grandTotal)} />
                </div>
            </>
        )
    }

    return (
        <div className="summary">
            <h3 className="summary__title">SUMMARY</h3>
            <div className="summary__items">{renderItems()}</div>
            <div className="summary__fields">{renderSummaryFields()}</div>
            <button
                disabled={shouldPreventSubmit()}
                form={formId}
                type="submit"
                className="btn btn--primary summary__submit-btn"
            >
                {checkoutStatus.isCheckingOut && (
                    <div className="btn-loading-overlay">
                        <RingLoader />
                    </div>
                )}
                CONTINUE & PAY
            </button>
        </div>
    )
}
