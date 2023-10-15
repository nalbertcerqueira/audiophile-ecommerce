"use client"

import { CartIcon } from "../icons/CartIcon"
import { useContext, useEffect } from "react"
import { CartModalContext } from "@/contexts/CartModalContext"

export function CartButton({ className }: { className: string }) {
    const { toggleCart, closeCart } = useContext(CartModalContext)

    //Fechando o modal durante a desmontagem do componente
    useEffect(() => closeCart, [closeCart])

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
