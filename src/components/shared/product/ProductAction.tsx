"use client"

import { Counter } from "../Counter"
import { useContext, useState } from "react"
import { CartContext } from "@/contexts/cartContext/CartContext"
import { SessionContext } from "@/contexts/sessionContext/SessionContext"
import { CheckoutContext } from "@/contexts/checkoutContext/CheckoutContext"

export function AddProductAction({ productId }: { productId: string }) {
    const [count, setCount] = useState<number>(0)
    const { isLoading: isSessionLoading } = useContext(SessionContext)
    const { cartStatus, addItem, setCartStatus } = useContext(CartContext)
    const { updateTaxes, setCheckoutStatus } = useContext(CheckoutContext)

    function handleAddItem() {
        if (cartStatus.isLoading || isSessionLoading) return

        //O loading da taxa também é ativado para dar a impressão de que ambas, a taxa
        //e a ação de adicionar items ao carrinho, são iniciadas ao mesmo tempo
        setCartStatus({ type: "ENABLE", payload: { productId } })
        setCheckoutStatus((prevState) => ({ ...prevState, isLoadingTaxes: true }))

        addItem(productId, count, { emitToast: true })
            .then((res) => {
                setCount(0)
                setCartStatus({ type: "DISABLE", payload: { productId } })
                return res ? updateTaxes() : null
            })
            .then(() => {
                setCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
            })
    }

    return (
        <div className="product__cart-actions">
            <Counter
                disabled={cartStatus.isLoading}
                ariaLive={count ? "polite" : "off"}
                count={count}
                increment={() => setCount((prevCount) => prevCount + 1)}
                decrement={() =>
                    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount))
                }
            />
            <button
                disabled={cartStatus.isLoading}
                aria-disabled={cartStatus.isLoading}
                onClick={handleAddItem}
                className="btn btn--primary"
                aria-label={count ? `add ${count} products to cart` : "can't add 0 products"}
                type="button"
            >
                ADD TO CART
            </button>
        </div>
    )
}
