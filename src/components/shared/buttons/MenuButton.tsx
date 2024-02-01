"use client"

import { ModalContext } from "@/contexts/ModalContext"
import { MenuIcon } from "../icons/MenuIcon"
import { useContext, useEffect } from "react"
import { usePathname } from "next/navigation"

export function MobileMenuButton() {
    const { menuMobileModal } = useContext(ModalContext)
    const pathname = usePathname()

    //Fechando o modal quando a rota for alterada
    useEffect(() => menuMobileModal.close, [menuMobileModal.close, pathname])

    return (
        <button
            type="button"
            className="menu-btn"
            onClick={() => menuMobileModal.toggle()}
            aria-label="toggle navigation menu"
            aria-controls="mobile-menu"
        >
            <MenuIcon />
        </button>
    )
}
