"use client"

import { MobileMenu } from "./MobileMenu"
import { Overlay } from "../Overlay"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector, useAppStore } from "@/libs/redux/hooks"
import { closeModal } from "@/store/modals/modalsSlice"

export function MobileMenuModal() {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.modals.mobileMenu.isOpen)
    const store = useAppStore()

    //Fechando o modal caso o usuário clique fora dele
    useEffect(() => {
        function handleOutsideClick(e: globalThis.MouseEvent) {
            const target = e.target as HTMLElement
            const modalOpen = store.getState().modals.mobileMenu.isOpen
            const isMenuButton = target.classList.contains("menu-btn")

            if (modalOpen && !isMenuButton && !target.closest(".mobile-menu")) {
                dispatch(closeModal("mobileMenu"))
            }
        }

        document.addEventListener("click", handleOutsideClick)
        return () => window.removeEventListener("click", handleOutsideClick)
    }, [dispatch, store])

    return (
        <Overlay className={`mobile-menu-overlay`} isHidden={!isOpen}>
            <MobileMenu isOpen={isOpen} />
        </Overlay>
    )
}
