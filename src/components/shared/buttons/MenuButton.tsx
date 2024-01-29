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
        <button onClick={() => menuMobileModal.toggle()} className="menu-btn" type="button">
            <MenuIcon />
        </button>
    )
}
