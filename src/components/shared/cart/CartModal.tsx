"use client"

import { ModalContext } from "@/contexts/ModalContext"
import { useContext, MouseEvent } from "react"
import { MiniCart } from "./MiniCart"
import { Overlay } from "../Overlay"

export function CartModal() {
    const { cartModal } = useContext(ModalContext)

    function handleCloseCart(e: MouseEvent<HTMLDivElement>): void {
        const target = e.target as HTMLElement

        if (!target.closest(".mini-cart")) {
            cartModal.close()
        }
    }

    return (
        <Overlay isHidden={!cartModal.isOpen} onClick={handleCloseCart}>
            <MiniCart isOpen={cartModal.isOpen} />
        </Overlay>
    )
}
