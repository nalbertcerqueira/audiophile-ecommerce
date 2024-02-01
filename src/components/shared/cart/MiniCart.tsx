"use client"

import { CartContext } from "@/contexts/CartContext"
import { SummaryField } from "./SummaryField"
import { CartItem } from "./CartItem"
import { useContext } from "react"
import Link from "next/link"
import { CheckoutContext } from "@/contexts/CheckoutContext"

export function MiniCart({ isOpen }: { isOpen: boolean }) {
    const { cart, loadingState, clearCart, updateCartStatus } = useContext(CartContext)
    const { updateTaxes, updateCheckoutStatus } = useContext(CheckoutContext)

    function handleClearCart() {
        if (loadingState.isLoading) {
            return
        }

        updateCartStatus({ type: "CLEAR" })
        updateCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: true })

        clearCart()
            .then((res) => {
                updateCartStatus({ type: "DISABLE" })
                return res ? updateTaxes() : null
            })
            .then(() => {
                updateCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
            })
    }

    return (
        <div
            aria-hidden={isOpen ? "false" : "true"}
            id="shopping-cart"
            className={`mini-cart ${isOpen ? "" : "mini-cart--hidden"}`.trim()}
        >
            {isOpen && (
                <span className="screen-reader" aria-live="polite">
                    shopping cart is open
                </span>
            )}

            <div className="mini-cart__header">
                <h3
                    aria-label={`cart with ${cart.itemCount} items`}
                    className="mini-cart__title"
                >
                    CART{" "}
                    <span aria-label={`${cart.itemCount} items`} className="mini-cart__count">
                        ({cart.itemCount})
                    </span>
                </h3>
                <button
                    onClick={handleClearCart}
                    aria-label="clear cart"
                    className="mini-cart__clear-btn"
                    type="button"
                >
                    Remove all
                </button>
            </div>
            <div className="mini-cart__items">
                {cart.items.map((item) => (
                    <CartItem
                        key={item.productId}
                        productId={item.productId}
                        slug={item.slug}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                    />
                ))}
            </div>
            <div className="mini-cart__total">
                <SummaryField
                    ariaLabel={`total of: ${cart.totalSpent} dollars`}
                    name="TOTAL"
                    value={cart.totalSpent}
                />
            </div>
            <Link
                href="/checkout"
                className="btn btn--primary mini-cart__checkout-btn"
                type="button"
            >
                CHECKOUT
            </Link>
        </div>
    )
}
