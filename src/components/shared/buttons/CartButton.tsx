"use client"

import { CartIcon } from "../icons/CartIcon"
import { useContext, useEffect } from "react"
import { ModalContext } from "@/contexts/modalContext/ModalContext"
import { usePathname } from "next/navigation"
import { CartContext } from "@/contexts/cartContext/CartContext"

export function CartButton() {
    const { cartModal } = useContext(ModalContext)
    const { cart } = useContext(CartContext)
    const pathname = usePathname()

    //Fechando o modal quando a rota for alterada
    useEffect(() => cartModal.close, [cartModal.close, pathname])

    return (
        <button
            onClick={() => cartModal.toggle()}
            className="cart-btn"
            type="button"
            aria-label="toggle shopping cart"
            aria-controls="shopping-cart"
        >
            <CartIcon />
            {cart.itemCount > 0 && (
                <span aria-hidden="false" className="cart-btn__counter">
                    {cart.itemCount > 99 ? 99 : cart.itemCount}
                </span>
            )}
        </button>
    )
}
