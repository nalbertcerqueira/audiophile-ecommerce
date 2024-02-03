"use client"

import { Counter } from "../Counter"
import { useContext, useState } from "react"
import { CartContext } from "@/contexts/CartContext"
import { CheckoutContext } from "@/contexts/CheckoutContext"

export function AddProductAction({ productId }: { productId: string }) {
    const [count, setCount] = useState<number>(0)
    const { loadingState, addItem, setCartLoadingStatus } = useContext(CartContext)
    const { updateTaxes, setCheckoutLoadingStatus: updateCheckoutStatus } =
        useContext(CheckoutContext)

    function handleAddItem() {
        if (loadingState.isLoading) {
            return
        }

        //O loading da taxa também é ativado para dar a impressão de que ambas, a taxa
        //e a ação de adicionar items ao carrinho, são iniciadas ao mesmo tempo
        setCartLoadingStatus({ type: "ENABLE", payload: { productId } })
        updateCheckoutStatus((prevState) => ({ ...prevState, isLoadingTaxes: true }))

        addItem(productId, count, { emitToast: true })
            .then((res) => {
                setCartLoadingStatus({ type: "DISABLE", payload: { productId } })
                return res ? updateTaxes() : null
            })
            .then(() => {
                updateCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
            })
    }

    function shouldDisableCounter() {
        const isLoading = loadingState.currentProductIds.includes(productId)
        const isCleaning = loadingState.isLoading && !loadingState.currentProductIds.length

        return isLoading || isCleaning
    }

    return (
        <div className="product__cart-actions">
            <Counter
                disabled={shouldDisableCounter()}
                count={count}
                increment={() => setCount((prevCount) => prevCount + 1)}
                decrement={() =>
                    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount))
                }
            />
            <button
                disabled={shouldDisableCounter()}
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
