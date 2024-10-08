"use client"

import { CartItemSkeleton } from "@/components/shared/loaders/skeletons/CartItemSkeleton"
import { useAppSelector } from "@/libs/redux/hooks"
import { CartItemCard } from "@/components/shared/cart/CartItem"
import { selectCart } from "@/store/cart"

export function SummaryItems() {
    const { items, status } = useAppSelector(selectCart)
    const isCartLoading = status.state !== "settled"

    const renderedLoading = (
        <>
            <CartItemSkeleton />
            <CartItemSkeleton />
        </>
    )

    const renderedItems = items.map((item) => (
        <CartItemCard
            key={item.productId}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            slug={item.slug}
            readOnly
        />
    ))

    return (
        <div className="summary__items">{isCartLoading ? renderedLoading : renderedItems}</div>
    )
}
