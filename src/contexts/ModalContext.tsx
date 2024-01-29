"use client"

import { createContext, PropsWithChildren, useCallback, useState } from "react"

interface Modal {
    isOpen: boolean
    toggle: () => void
    close: () => void
}

interface ModalContext {
    cartModal: Modal
    menuMobileModal: Modal
}

export const ModalContext = createContext<ModalContext>({} as ModalContext)

export function ModalProvider({ children }: PropsWithChildren) {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const toggleCart = useCallback(() => setIsCartOpen((prevState) => !prevState), [])
    const closeCart = useCallback(() => setIsCartOpen(false), [])

    const toggleMenu = useCallback(() => setIsMenuOpen((prevState) => !prevState), [])
    const closeMenu = useCallback(() => setIsMenuOpen(false), [])

    return (
        <ModalContext.Provider
            value={{
                cartModal: { isOpen: isCartOpen, toggle: toggleCart, close: closeCart },
                menuMobileModal: { isOpen: isMenuOpen, toggle: toggleMenu, close: closeMenu }
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}
