"use client"

import { PropsWithChildren, createContext, useState, useEffect, useContext } from "react"
import { CartProps } from "@/@core/shared/entities/cart/cart"
import { AuthContext } from "./AuthContext"
import {
    httpGetCartUseCase,
    localStorageGetCartUseCase
} from "@/@core/frontend/main/usecases/cart/getCartFactory"
import {
    httpClearCartUseCase,
    localStorageClearCartUseCase
} from "@/@core/frontend/main/usecases/cart/clearCartFactory"
import {
    httpAddCartItemUseCase,
    localStorageAddCartItemUseCase
} from "@/@core/frontend/main/usecases/cart/addCartItemFactory"
import {
    httpRemoveCartItemUseCase,
    localStorageRemoveCartItemUseCase
} from "@/@core/frontend/main/usecases/cart/removeCartItemFactory"

interface CartContextProps {
    cart: CartProps
    addItem: (productId: string, quantity: number) => void
    removeItem: (productId: string, quantity: number) => void
    clearCart: () => void
}

const initialState = { userId: "0", itemCount: 0, totalSpent: 0, items: [] }

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export function CartProvider({ children }: PropsWithChildren) {
    const [cart, setCart] = useState<CartProps>(initialState)
    const { isLogged, isLoading } = useContext(AuthContext)

    useEffect(() => {
        getCart()
        async function getCart() {
            const useCase = isLogged ? httpGetCartUseCase : localStorageGetCartUseCase
            try {
                if (!isLoading) {
                    const cart = await useCase.execute()
                    setCart(cart.toJSON())
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [isLogged, isLoading])

    async function addItem(productId: string, quantity: number) {
        const useCase = isLogged ? httpAddCartItemUseCase : localStorageAddCartItemUseCase
        try {
            if (!isLoading) {
                const cart = await useCase.execute({ productId, quantity })
                setCart(cart.toJSON())
            }
        } catch (error: any) {
            if (error.name === "Unauthorized error") {
                location.reload()
            }
        }
    }

    async function removeItem(productId: string, quantity: number) {
        const useCase = isLogged
            ? httpRemoveCartItemUseCase
            : localStorageRemoveCartItemUseCase

        try {
            if (!isLoading) {
                const cart = await useCase.execute({ productId, quantity })
                setCart(cart.toJSON())
            }
        } catch (error: any) {
            if (error.name === "Unauthorized error") {
                location.reload()
            }
        }
    }

    async function clearCart() {
        const useCase = isLogged ? httpClearCartUseCase : localStorageClearCartUseCase
        try {
            if (!isLoading) {
                const cart = await useCase.execute()
                setCart(cart.toJSON())
            }
        } catch (error: any) {
            if (error.name === "Unauthorized error") {
                location.reload()
            }
        }
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
