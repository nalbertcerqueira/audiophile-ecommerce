"use client"

import { createContext, PropsWithChildren, useCallback, useState } from "react"
import { ModalContextProps } from "./types"

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

export function ModalProvider({ children }: PropsWithChildren) {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const toggleCart = () => setIsCartOpen((prevState) => !prevState)
    const closeCart = useCallback(() => setIsCartOpen(false), [])

    const toggleMenu = () => setIsMenuOpen((prevState) => !prevState)
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
