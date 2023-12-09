"use client"

import { CartProps } from "@/@core/shared/entities/cart/cart"
import { localStorageGetCartUseCase } from "@/@core/frontend/main/usecases/cart/getCartFactory"
import { localStorageClearCartUseCase } from "@/@core/frontend/main/usecases/cart/clearCartFactory"
import { localStorageAddCartItemUseCase } from "@/@core/frontend/main/usecases/cart/addCartItemFactory"
import { localStorageRemoveCartItemUseCase } from "@/@core/frontend/main/usecases/cart/removeCartItemFactory"
import { PropsWithChildren, createContext, useState, useEffect } from "react"

type ItemData = {
    productId: string
    quantity: number
}

interface CartContextProps {
    cart: CartProps
    addItem: (itemData: ItemData) => void
    removeItem: (itemId: string, quantity: number) => void
    clearCart: () => void
}

const initialState = { userId: "0", itemCount: 0, totalSpent: 0, items: [] }
export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export function CartProvider({ children }: PropsWithChildren) {
    const [cart, setCart] = useState<CartProps>(initialState)

    useEffect(() => {
        getCart()
    }, [])

    async function getCart() {
        const newCart = await localStorageGetCartUseCase.execute()
        setCart(newCart.toJSON())
    }

    async function addItem(itemInfo: ItemData) {
        const newCart = await localStorageAddCartItemUseCase.execute(itemInfo)
        setCart(newCart.toJSON())
    }

    async function removeItem(itemId: string, quantity: number) {
        const newCart = await localStorageRemoveCartItemUseCase.execute(itemId, quantity)
        setCart(newCart.toJSON())
    }

    async function clearCart() {
        const emptyCart = await localStorageClearCartUseCase.execute()
        setCart(emptyCart.toJSON())
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
