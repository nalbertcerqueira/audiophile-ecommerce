"use client"

import { Cart, CartProps } from "@/@core/shared/entities/cart/cart"
import { getCartUseCase } from "@/@core/frontend/main/usecases/cart/getCartFactory"
import { clearCartUseCase } from "@/@core/frontend/main/usecases/cart/clearCartFactory"
import { addCartItemUseCase } from "@/@core/frontend/main/usecases/cart/addCartItemFactory"
import { removeCartItemUseCase } from "@/@core/frontend/main/usecases/cart/removeCartItemFactory"
import { CartLoadingState } from "@/store/cartLoading/types"
import { cartLoadingReducer } from "@/store/cartLoading/reducer"
import { cartLoadingInititalState } from "@/store/cartLoading/initialState"
import { PropsWithChildren, createContext, useState, useEffect, useReducer } from "react"

interface CartContextProps {
    cart: CartProps
    loadingState: CartLoadingState
    addItem: (productId: string, quantity: number) => void
    removeItem: (productId: string, quantity: number) => void
    clearCart: () => void
}

const cartInitialState = Cart.empty().toJSON()

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export function CartProvider({ children }: PropsWithChildren) {
    const [cart, setCart] = useState<CartProps>(cartInitialState)
    const [loadingState, loadingDispatch] = useReducer(
        cartLoadingReducer,
        cartLoadingInititalState
    )

    useEffect(() => {
        getCart()
        async function getCart() {
            loadingDispatch({ type: "ENABLE" })
            try {
                const cart = await getCartUseCase.execute()
                setCart(cart.toJSON())
            } catch (error: any) {
                if (error.name !== "UnauthorizedError") {
                    return console.log(error)
                }
            } finally {
                loadingDispatch({ type: "DISABLE" })
            }
        }
    }, [])

    async function addItem(productId: string, quantity: number): Promise<void> {
        if (shouldBlockAction(productId)) return

        const timerRef = setTimeout(
            () => loadingDispatch({ type: "ENABLE", payload: { productId } }),
            200
        )
        try {
            const cart = await addCartItemUseCase.execute({ productId, quantity })
            cart && setCart(cart.toJSON())
        } catch (error: any) {
            if (error.name === "UnauthorizedError") {
                location.reload()
            }
        } finally {
            clearTimeout(timerRef)
            loadingDispatch({ type: "DISABLE", payload: { productId } })
        }
    }

    async function removeItem(productId: string, quantity: number): Promise<void> {
        if (shouldBlockAction(productId)) return

        const timerRef = setTimeout(
            () => loadingDispatch({ type: "ENABLE", payload: { productId } }),
            200
        )
        try {
            const cart = await removeCartItemUseCase.execute({ productId, quantity })
            cart && setCart(cart.toJSON())
        } catch (error: any) {
            if (error.name === "UnauthorizedError") {
                location.reload()
            }
        } finally {
            clearTimeout(timerRef)
            loadingDispatch({ type: "DISABLE", payload: { productId } })
        }
    }

    async function clearCart(): Promise<void> {
        if (loadingState.isLoading) return

        loadingDispatch({ type: "CLEAR" })
        try {
            if (cart.items.length) {
                const cart = await clearCartUseCase.execute()
                setCart(cart.toJSON())
            }
        } catch (error: any) {
            if (error.name === "UnauthorizedError") {
                location.reload()
            }
        } finally {
            loadingDispatch({ type: "DISABLE" })
        }
    }

    function shouldBlockAction(productId: string): boolean {
        const isProductAction = loadingState.currentProductIds.includes(productId)
        const isCleaning = loadingState.isLoading && !loadingState.currentProductIds.length

        return isProductAction || isCleaning
    }

    return (
        <CartContext.Provider value={{ loadingState, cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
