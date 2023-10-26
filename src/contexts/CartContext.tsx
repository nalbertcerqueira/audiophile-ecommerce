"use client"

import { CartProps } from "@/@core/shared/entities/cart"
import { getCartUseCase } from "@/@core/frontend/main/usecases/getCartFactory"
import { clearCartUseCase } from "@/@core/frontend/main/usecases/clearCartFactory"
import { addCartItemUseCase } from "@/@core/frontend/main/usecases/addCartItemFactory"
import { removeCartItemUseCase } from "@/@core/frontend/main/usecases/removeCartItemFactory"
import { PropsWithChildren, createContext, useState, useEffect } from "react"

type ItemData = {
    productId: string
    quantity: number
}

interface CartContextProps {
    cart: CartProps
    addItem: (itemData: ItemData) => void
    removeItem: (itemId: string) => void
    clearCart: () => void
}

const initialState = { accountId: "0", itemCount: 0, totalSpent: 0, items: [] }
export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export function CartProvider({ children }: PropsWithChildren) {
    const [cart, setCart] = useState<CartProps>(initialState)

    useEffect(() => {
        getCart()
    }, [])

    async function getCart() {
        const newCart = await getCartUseCase.execute()
        setCart(newCart.toJSON())
    }

    async function addItem(itemInfo: ItemData) {
        const newCart = await addCartItemUseCase.execute(itemInfo)
        newCart && setCart(newCart.toJSON())
    }

    async function removeItem(itemId: string) {
        const newCart = await removeCartItemUseCase.execute(itemId)
        setCart(newCart.toJSON())
    }

    async function clearCart() {
        const emptyCart = await clearCartUseCase.execute()
        setCart(emptyCart.toJSON())
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
