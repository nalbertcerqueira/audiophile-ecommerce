"use client"

import { CartModalContext } from "@/contexts/CartModalContext"
import { useContext, MouseEvent } from "react"
import { MiniCart } from "./MiniCart"

export function CartModal() {
    const { isOpen, closeCart } = useContext(CartModalContext)

    function handleCloseCart(e: MouseEvent<HTMLDivElement>): void {
        const target = e.target as HTMLElement

        if (!target.closest(".mini-cart")) {
            closeCart()
        }
    }

    return (
        <div
            onClick={handleCloseCart}
            className={`overlay ${isOpen ? "" : "overlay--hidden"}`.trim()}
        >
            <div className="overlay__inner">
                <MiniCart isOpen={isOpen} />
            </div>
        </div>
    )
}
