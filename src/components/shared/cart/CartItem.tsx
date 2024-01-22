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
    const { addItem, removeItem, loadingState } = useContext(CartContext)
    const { updateStatus } = useContext(CheckoutContext)
    const isLoading = loadingState.currentProductIds.includes(productId) && !readOnly

    function handleRemoveItem() {
        updateStatus((prevState) => ({ ...prevState, isLoadingTaxes: true }))
        removeItem(productId, 1)
    }

    function handleAddItem() {
        updateStatus((prevState) => ({ ...prevState, isLoadingTaxes: true }))
        addItem(productId, 1)
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
                    disabled={isLoading}
                    count={quantity}
                    decrement={handleRemoveItem}
                    increment={handleAddItem}
                    className="cart-item__counter"
                />
            )}
        </div>
    )
}
