"use client"

import { CartItemSkeleton } from "@/components/shared/loaders/skeletons/CartItemSkeleton"
import { CartContext } from "@/contexts/cartContext/CartContext"
import { CartItem } from "@/components/shared/cart/CartItem"
import { useContext } from "react"

export function SummaryItems() {
    const { cartStatus, cart } = useContext(CartContext)
    const isCartClearing = !cartStatus.currentProductIds.length
    const isCartBusy = cartStatus.isLoading

    const renderedLoading = (
        <>
            <CartItemSkeleton />
            <CartItemSkeleton />
        </>
    )

    const renderedItems = cart.items.map((item) => (
        <CartItem
            key={item.productId}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            slug={item.slug}
            readOnly
        />
    ))

    return (
        <div className="summary__items">
            {isCartBusy && isCartClearing ? renderedLoading : renderedItems}
        </div>
    )
}
