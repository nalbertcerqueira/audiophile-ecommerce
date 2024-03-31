"use client"

import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks"
import { CartIcon } from "../icons/CartIcon"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { closeModal, toggleModal } from "@/store/modals/modalsSlice"

export function CartButton() {
    const dispatch = useAppDispatch()
    const itemCount = useAppSelector((state) => state.cart.itemCount)
    const pathname = usePathname()

    //Fechando o modal quando a rota for alterada
    useEffect(() => {
        return () => {
            dispatch(closeModal("cart"))
        }
    }, [dispatch, pathname])

    return (
        <button
            onClick={() => dispatch(toggleModal("cart"))}
            className="cart-btn"
            type="button"
            aria-label="toggle shopping cart"
            aria-controls="shopping-cart"
        >
            <CartIcon />
            {itemCount > 0 && (
                <span aria-hidden="false" className="cart-btn__counter">
                    {itemCount > 99 ? 99 : itemCount}
                </span>
            )}
        </button>
    )
}
