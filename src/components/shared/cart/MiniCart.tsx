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
    const { updateTaxes, setCheckoutStatus } = useContext(CheckoutContext)
    const {
        cart,
        cartStatus,
        requestCount,
        addItem,
        removeItem,
        clearCart,
        isCartBusy,
        setCartStatus
    } = useContext(CartContext)

    function handleClearCart() {
        if (cartStatus.isLoading) return

        setCartStatus({ type: "CLEAR" })
        setCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: true })

        clearCart()
            .then((res) => {
                setCartStatus({ type: "DISABLE" })
                return res ? updateTaxes() : null
            })
            .then(() => {
                setCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
            })
    }

    function shouldCheckout() {
        if (!isLogged) {
            return window.location.assign("/signin")
        }
        return router.push("/checkout")
    }

    async function handleRemoveItem(productId: string) {
        if (isCartBusy(productId)) return

        const requestId = (requestCount.current += 1)
        setCartStatus({ type: "ENABLE", payload: { productId } })
        setCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: true })

        await removeItem(productId, 1)
            .then((res) => {
                setCartStatus({ type: "DISABLE", payload: { productId } })
                return res ? updateTaxes() : null
            })
            .then(() => {
                if (requestCount.current === requestId) {
                    //Verificando se esta é a última (ou a única) requisição de remover items ao carrinho,
                    //para não interromper o loading antes da ultima requisição acabar.
                    setCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
                }
            })
    }

    async function handleAddItem(productId: string) {
        if (isCartBusy(productId)) return

        const requestId = (requestCount.current += 1)
        setCartStatus({ type: "ENABLE", payload: { productId } })
        setCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: true })

        await addItem(productId, 1)
            .then((res) => {
                setCartStatus({ type: "DISABLE", payload: { productId } })
                return res ? updateTaxes() : null
            })
            .then(() => {
                //Verificando se esta é a última (ou a única) requisição de adicionar items ao carrinho,
                //para não interromper o loading antes da ultima requisição acabar.
                if (requestCount.current === requestId) {
                    setCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
                }
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
                        slug={item.slug}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        readOnly={false}
                        isBusy={isCartBusy(item.productId)}
                        addItem={() => handleAddItem(item.productId)}
                        removeItem={() => handleRemoveItem(item.productId)}
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
