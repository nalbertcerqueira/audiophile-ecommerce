"use client"

import Link from "next/link"
import { Counter } from "../Counter"
import { useContext, useState } from "react"
import { CartContext } from "@/contexts/CartContext"

export function AddProductAction({ productId }: { productId: string }) {
    const [count, setCount] = useState<number>(0)
    const { loadingState, addItem } = useContext(CartContext)
    const isLoading = loadingState.currentProductIds.includes(productId)

    return (
        <div className="product__cart-actions">
            <Counter
                disabled={isLoading}
                count={count}
                increment={() => setCount((prevCount) => prevCount + 1)}
                decrement={() =>
                    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount))
                }
            />
            <button
                disabled={isLoading}
                onClick={() => addItem(productId, count)}
                className="btn btn--primary"
                type="button"
            >
                ADD TO CART
            </button>
        </div>
    )
}

export function ProductLink({ href }: { href: string }) {
    return (
        <Link role="button" href={href} className="btn btn--primary preview__product-link">
            SEE PRODUCT
        </Link>
    )
}
