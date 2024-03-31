"use client"

import { CartItemSkeleton } from "@/components/shared/loaders/skeletons/CartItemSkeleton"
import { useAppSelector } from "@/libs/redux/hooks"
import { CartItem } from "@/components/shared/cart/CartItem"
import { selectCart } from "@/store/cart/cartSlice"

export function SummaryItems() {
    const { items, status } = useAppSelector(selectCart)
    const cleaningOrFetching = status.state === "fetching" || status.state === "clearing"

    const renderedLoading = (
        <>
            <CartItemSkeleton />
            <CartItemSkeleton />
        </>
    )

    const renderedItems = items.map((item) => (
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
            {cleaningOrFetching ? renderedLoading : renderedItems}
        </div>
    )
}
