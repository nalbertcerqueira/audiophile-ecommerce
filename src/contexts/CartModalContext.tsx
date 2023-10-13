"use client"

import { createContext, PropsWithChildren, useCallback, useState } from "react"

interface CartModalContextProps {
    isOpen: boolean
    toggleCart: () => void
    closeCart: () => void
}

export const CartModalContext = createContext<CartModalContextProps>(
    {} as CartModalContextProps
)

export function CartModalProvider({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleCart = useCallback(() => setIsOpen((prevState) => !prevState), [])

    const closeCart = useCallback(() => setIsOpen(false), [])

    return (
        <CartModalContext.Provider value={{ isOpen, toggleCart, closeCart }}>
            {children}
        </CartModalContext.Provider>
    )
}
