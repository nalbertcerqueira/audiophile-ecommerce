"use client"

import { createContext, PropsWithChildren, useState } from "react"

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

    function toggleCart(): void {
        setIsOpen((prevState) => !prevState)
    }

    function closeCart(): void {
        setIsOpen(false)
    }

    return (
        <CartModalContext.Provider value={{ isOpen, toggleCart, closeCart }}>
            {children}
        </CartModalContext.Provider>
    )
}
