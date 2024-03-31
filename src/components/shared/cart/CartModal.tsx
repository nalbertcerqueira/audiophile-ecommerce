"use client"

import { MiniCart } from "./MiniCart"
import { Overlay } from "../Overlay"
import { useAppSelector, useAppDispatch } from "@/libs/redux/hooks"
import { closeModal } from "@/store/modals/modalsSlice"
import { useEffect } from "react"

export function CartModal() {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.modals.cart.isOpen)

    // Fechando o modal caso o usuário clique fora dele
    useEffect(() => {
        function handleOutsideClick(e: globalThis.MouseEvent) {
            const target = e.target as HTMLElement
            const isCartButton = target.classList.contains("cart-btn")

            if (!target.closest(".mini-cart") && !isCartButton) {
                dispatch(closeModal("cart"))
            }
        }

        document.addEventListener("click", handleOutsideClick)
        return () => window.removeEventListener("click", handleOutsideClick)
    }, [dispatch])

    return (
        <Overlay isHidden={!isOpen}>
            <MiniCart isOpen={isOpen} />
        </Overlay>
    )
}
