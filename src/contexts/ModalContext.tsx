"use client"

import { createContext, PropsWithChildren, useCallback, useState } from "react"

interface Modal {
    isOpen: boolean
    toggle: () => void
    close: () => void
}

interface ModalContext {
    cartModal: Modal
}

export const ModalContext = createContext<ModalContext>({} as ModalContext)

export function ModalProvider({ children }: PropsWithChildren) {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

    const toggleCart = useCallback(() => setIsCartOpen((prevState) => !prevState), [])
    const closeCart = useCallback(() => setIsCartOpen(false), [])

    return (
        <ModalContext.Provider
            value={{
                cartModal: { isOpen: isCartOpen, toggle: toggleCart, close: closeCart }
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}
