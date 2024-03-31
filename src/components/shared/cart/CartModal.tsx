"use client"

import { MiniCart } from "./MiniCart"
import { Overlay } from "../Overlay"
import { useAppSelector, useAppDispatch, useAppStore } from "@/libs/redux/hooks"
import { closeModal } from "@/store/modals/modalsSlice"
import { useEffect } from "react"

export function CartModal() {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.modals.cart.isOpen)
    const store = useAppStore()

    // Fechando o modal caso o usuário clique fora dele
    useEffect(() => {
        function handleOutsideClick(e: globalThis.MouseEvent) {
            const target = e.target as HTMLElement
            const modalOpen = store.getState().modals.cart.isOpen
            const isCartButton = target.classList.contains("cart-btn")

            if (modalOpen && !isCartButton && !target.closest(".mini-cart")) {
                dispatch(closeModal("cart"))
            }
        }

        document.addEventListener("click", handleOutsideClick)
        return () => window.removeEventListener("click", handleOutsideClick)
    }, [dispatch, store])

    return (
        <Overlay isHidden={!isOpen}>
            <MiniCart isOpen={isOpen} />
        </Overlay>
    )
}
