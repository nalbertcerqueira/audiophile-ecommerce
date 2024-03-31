"use client"

import { useEffect } from "react"
import { MenuIcon } from "../icons/MenuIcon"
import { usePathname } from "next/navigation"
import { useAppDispatch } from "@/libs/redux/hooks"
import { closeModal, toggleModal } from "@/store/modals/modalsSlice"

export function MobileMenuButton() {
    const dispatch = useAppDispatch()
    const pathname = usePathname()

    //Fechando o modal quando a rota for alterada
    useEffect(() => {
        return () => {
            dispatch(closeModal("mobileMenu"))
        }
    }, [dispatch, pathname])

    return (
        <button
            type="button"
            className="menu-btn"
            onClick={() => dispatch(toggleModal("mobileMenu"))}
            aria-label="toggle navigation menu"
            aria-controls="mobile-menu"
        >
            <MenuIcon />
        </button>
    )
}
