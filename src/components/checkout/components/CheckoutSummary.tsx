"use client"

import { CartItem } from "@/components/shared/cart/CartItem"
import { SummaryField } from "@/components/shared/cart/SummaryField"
import { CartItemSkeleton } from "@/components/shared/loaders/skeletons/CartItemSkeleton"
import { SummarySkeleton } from "@/components/shared/loaders/skeletons/SummarySkeleton"
import { CartContext } from "@/contexts/CartContext"
import { formatCurrency } from "@/utils/helpers"
import { useContext } from "react"

interface CheckoutSummaryProps {
    formId: string
}

export function CheckoutSummary({ formId }: CheckoutSummaryProps) {
    const { cart, loadingState } = useContext(CartContext)
    const shipping = 50
    const vat = 1079
    const grandTotal = shipping + vat + cart.totalSpent
    const isLoading = loadingState.isLoading && !loadingState.currentProductIds.length

    function renderItems() {
        if (isLoading) {
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
        if (isLoading) {
            return <SummarySkeleton />
        }
        return (
            <>
                <div className="summary__total-fields">
                    <SummaryField name="TOTAL" value={formatCurrency(cart.totalSpent)} />
                    <SummaryField name="SHIPPING" value={formatCurrency(shipping)} />
                    <SummaryField name="VAT (INCLUDED)" value={formatCurrency(vat)} />
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
                form={formId}
                type="submit"
                className="btn btn--primary summary__submit-btn"
            >
                CONTINUE & PAY
            </button>
        </div>
    )
}
