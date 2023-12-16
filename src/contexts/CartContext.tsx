"use client"

import { Cart, CartProps } from "@/@core/shared/entities/cart/cart"
import { getCartUseCase } from "@/@core/frontend/main/usecases/cart/getCartFactory"
import { clearCartUseCase } from "@/@core/frontend/main/usecases/cart/clearCartFactory"
import { addCartItemUseCase } from "@/@core/frontend/main/usecases/cart/addCartItemFactory"
import { removeCartItemUseCase } from "@/@core/frontend/main/usecases/cart/removeCartItemFactory"
import { PropsWithChildren, createContext, useState, useEffect } from "react"

interface CartContextProps {
    cart: CartProps
    addItem: (productId: string, quantity: number) => void
    removeItem: (productId: string, quantity: number) => void
    clearCart: () => void
}

const initialState = Cart.empty("guest", "0").toJSON()

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export function CartProvider({ children }: PropsWithChildren) {
    const [cart, setCart] = useState<CartProps>(initialState)

    useEffect(() => {
        getCart()
        async function getCart() {
            try {
                const cart = await getCartUseCase.execute()
                setCart(cart.toJSON())
            } catch (error: any) {
                if (error.name !== "UnauthorizedError") {
                    console.log(error)
                }
            }
        }
    }, [])

    async function addItem(productId: string, quantity: number) {
        try {
            const cart = await addCartItemUseCase.execute({ productId, quantity })
            setCart(cart.toJSON())
        } catch (error: any) {
            if (error.name === "UnauthorizedError") {
                location.reload()
            }
        }
    }

    async function removeItem(productId: string, quantity: number) {
        try {
            const cart = await removeCartItemUseCase.execute({ productId, quantity })
            setCart(cart.toJSON())
        } catch (error: any) {
            if (error.name === "UnauthorizedError") {
                location.reload()
            }
        }
    }

    async function clearCart() {
        try {
            if (cart.items.length) {
                const cart = await clearCartUseCase.execute()
                setCart(cart.toJSON())
            }
        } catch (error: any) {
            if (error.name === "UnauthorizedError") {
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
