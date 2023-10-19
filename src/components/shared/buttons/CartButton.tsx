"use client"

import { CartIcon } from "../icons/CartIcon"
import { useContext, useEffect } from "react"
import { CartModalContext } from "@/contexts/CartModalContext"
import { usePathname } from "next/navigation"

export function CartButton({ className }: { className: string }) {
    const { toggleCart, closeCart } = useContext(CartModalContext)
    const pathname = usePathname()

    //Fechando o modal sempre que mudarmos de rota
    useEffect(() => closeCart, [closeCart, pathname])

    return (
        <button
            onClick={toggleCart}
            className={`cart-btn ${className}`.trim()}
            type="button"
            aria-label="toggle cart"
        >
            <CartIcon />
        </button>
    )
}
