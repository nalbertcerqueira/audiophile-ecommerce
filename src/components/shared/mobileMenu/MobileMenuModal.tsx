"use client"

import { Overlay } from "../Overlay"
import { useState, MouseEvent } from "react"
import { MobileMenu } from "./MobileMenu"

export function MobileMenuModal() {
    const [isOpen, setIsOpen] = useState(true)

    function handleCloseCart(e: MouseEvent<HTMLDivElement>): void {
        const target = e.target as HTMLElement

        if (!target.closest(".mobile-menu")) {
            setIsOpen(false)
        }
    }

    return (
        <Overlay className="mobile-menu-overlay" isHidden={!isOpen} onClick={handleCloseCart}>
            <MobileMenu />
        </Overlay>
    )
}
