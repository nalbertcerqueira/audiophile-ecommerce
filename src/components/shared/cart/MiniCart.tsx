"use client"

import { CheckoutContext } from "@/contexts/CheckoutContext"
import { SessionContext } from "@/contexts/SessionContext"
import { SummaryField } from "./SummaryField"
import { CartContext } from "@/contexts/CartContext"
import { CartItem } from "./CartItem"
import { useContext } from "react"
import { useRouter } from "next/navigation"

export function MiniCart({ isOpen }: { isOpen: boolean }) {
    const router = useRouter()
    const { isLogged } = useContext(SessionContext)
    const { cart, loadingState, clearCart, setCartLoadingStatus } = useContext(CartContext)
    const { updateTaxes, setCheckoutLoadingStatus } = useContext(CheckoutContext)

    function handleClearCart() {
        if (loadingState.isLoading) {
            return
        }

        //O loading da taxa também é ativado para dar a impressão de que ambas, a taxa
        //e a ação de adicionar items ao carrinho, são iniciadas ao mesmo tempo
        setCartLoadingStatus({ type: "CLEAR" })
        setCheckoutLoadingStatus({ isCheckingOut: false, isLoadingTaxes: true })

        clearCart()
            .then((res) => {
                setCartLoadingStatus({ type: "DISABLE" })
                return res ? updateTaxes() : null
            })
            .then(() => {
                setCheckoutLoadingStatus({ isCheckingOut: false, isLoadingTaxes: false })
            })
    }

    function shouldCheckout() {
        if (!isLogged) {
            return window.location.assign("/signin")
        }
        return router.push("/checkout")
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
            <button
                onClick={() => shouldCheckout()}
                className="btn btn--primary mini-cart__checkout-btn"
                type="button"
            >
                CHECKOUT
            </button>
        </div>
    )
}
