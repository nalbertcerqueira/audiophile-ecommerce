"use client"

import { ModalContext } from "@/contexts/ModalContext"
import { MobileMenu } from "./MobileMenu"
import { Overlay } from "../Overlay"
import { useContext, useEffect } from "react"

export function MobileMenuModal() {
    const { menuMobileModal } = useContext(ModalContext)
    const { close } = menuMobileModal

    useEffect(() => {
        function handleOutsideClick(e: globalThis.MouseEvent) {
            const target = e.target as HTMLElement
            const isMenuButton = target.classList.contains("menu-btn")

            if (!target.closest(".mobile-menu") && !isMenuButton) {
                close()
            }
        }

        document.addEventListener("click", handleOutsideClick)
        return () => window.removeEventListener("click", handleOutsideClick)
    }, [close])

    return (
        <Overlay
            className={`mobile-menu-overlay ${!menuMobileModal.isOpen ? "mobile-menu-overlay--hidden" : ""}`.trim()}
            isHidden={!menuMobileModal.isOpen}
        >
            <MobileMenu isOpen={menuMobileModal.isOpen} />
        </Overlay>
    )
}
