"use client"

import { CartItem } from "@/components/shared/cart/CartItem"
import { SummaryField } from "@/components/shared/cart/SummaryField"
import { CartContext } from "@/contexts/CartContext"
import { formatCurrency } from "@/utils/helpers"
import { useContext } from "react"

interface CheckoutSummaryProps {
    formId: string
}

export function CheckoutSummary({ formId }: CheckoutSummaryProps) {
    const { cart } = useContext(CartContext)
    const shipping = 50
    const vat = 1079
    const grandTotal = shipping + vat + cart.totalSpent

    return (
        <div className="summary">
            <h3 className="summary__title">SUMMARY</h3>
            <div className="summary__items">
                {cart.items.map((item) => (
                    <CartItem
                        key={item.productId}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        productId={item.productId}
                        slug={item.slug}
                        readOnly
                    />
                ))}
            </div>
            <div className="summary__total-fields">
                <SummaryField name="TOTAL" value={formatCurrency(cart.totalSpent)} />
                <SummaryField name="SHIPPING" value={formatCurrency(shipping)} />
                <SummaryField name="VAT (INCLUDED)" value={formatCurrency(vat)} />
            </div>
            <div className="summary__grand-total">
                <SummaryField name="GRAND TOTAL" value={formatCurrency(grandTotal)} />
            </div>
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
