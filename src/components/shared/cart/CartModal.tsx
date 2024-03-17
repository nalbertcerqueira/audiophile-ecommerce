"use client"

import { ModalContext } from "@/contexts/modalContext/ModalContext"
import { useContext, useEffect } from "react"
import { MiniCart } from "./MiniCart"
import { Overlay } from "../Overlay"

export function CartModal() {
    const { cartModal } = useContext(ModalContext)
    const { close } = cartModal

    //Fechando o modal caso o usuário clique fora dele
    useEffect(() => {
        function handleOutsideClick(e: globalThis.MouseEvent) {
            const target = e.target as HTMLElement
            const isCartButton = target.classList.contains("cart-btn")

            if (!target.closest(".mini-cart") && !isCartButton) {
                close()
            }
        }

        document.addEventListener("click", handleOutsideClick)
        return () => window.removeEventListener("click", handleOutsideClick)
    }, [close])

    return (
        <Overlay isHidden={!cartModal.isOpen}>
            <MiniCart isOpen={cartModal.isOpen} />
        </Overlay>
    )
}
