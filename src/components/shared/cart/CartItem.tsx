"use client"

import { formatCurrency } from "@/utils/helpers"
import { Counter } from "../Counter"
import { useContext } from "react"
import { CartContext } from "@/contexts/CartContext"
import { staticProductImages } from "@/utils/imageMap"
import Image from "next/image"
import { CheckoutContext } from "@/contexts/CheckoutContext"

interface CartItemProps {
    readOnly?: boolean
    productId: string
    slug: string
    name: string
    quantity: number
    price: number
}

export function CartItem({ readOnly, name, productId, slug, quantity, price }: CartItemProps) {
    const { addItem, removeItem, updateCartStatus, loadingState } = useContext(CartContext)
    const { updateTaxes, updateCheckoutStatus, status } = useContext(CheckoutContext)

    async function handleRemoveItem() {
        const cartTimer = updateCartStatus({ type: "ENABLE", payload: { productId } }, 250)
        const checkoutTimer = updateCheckoutStatus(
            { isCheckingOut: false, isLoadingTaxes: true },
            500
        )

        await removeItem(productId, 1)
            .then((res) => {
                cartTimer && clearTimeout(cartTimer)
                updateCartStatus({ type: "DISABLE", payload: { productId } })

                if (res) {
                    if (status.isLoadingTaxes) {
                        updateCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: true })
                    }
                    return updateTaxes()
                }
            })
            .then(() => {
                checkoutTimer && clearTimeout(checkoutTimer)
                updateCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
            })
    }

    async function handleAddItem() {
        const cartTimer = updateCartStatus({ type: "ENABLE", payload: { productId } }, 250)
        const checkoutTimer = updateCheckoutStatus(
            { isCheckingOut: false, isLoadingTaxes: true },
            500
        )

        await addItem(productId, 1)
            .then((res) => {
                cartTimer && clearTimeout(cartTimer)
                updateCartStatus({ type: "DISABLE", payload: { productId } })

                if (res) {
                    if (status.isLoadingTaxes) {
                        updateCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: true })
                    }
                    return updateTaxes()
                }
            })
            .then(() => {
                checkoutTimer && clearTimeout(checkoutTimer)
                updateCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
            })
    }

    function shouldDisableCounter() {
        const isLoading = loadingState.currentProductIds.includes(productId)
        const isCleaning = loadingState.isLoading && !loadingState.currentProductIds.length

        return (isLoading && !readOnly) || (isCleaning && !readOnly)
    }

    return (
        <div className="cart-item">
            <Image
                className="cart-item__thumb"
                src={staticProductImages[slug].cartThumb}
                alt={slug.split("-").join(" ")}
            />
            <div className="cart-item__info">
                <div>
                    <p className="cart-item__name">{name.toUpperCase()}</p>
                    <p className="cart-item__price">{formatCurrency(price)}</p>
                </div>
                {readOnly && <p className="cart-item__qty">{`x${quantity}`}</p>}
            </div>
            {!readOnly && (
                <Counter
                    disabled={shouldDisableCounter()}
                    count={quantity}
                    decrement={handleRemoveItem}
                    increment={handleAddItem}
                    className="cart-item__counter"
                />
            )}
        </div>
    )
}
