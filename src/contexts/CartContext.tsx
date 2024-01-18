"use client"

import {
    PropsWithChildren,
    createContext,
    useState,
    useEffect,
    useReducer,
    useContext
} from "react"
import {
    CartAwaitingMessage,
    SuccessAdditionMessage
} from "@/libs/react-toastify/components/CartMessages"
import { Id } from "react-toastify"
import { removeCartItemUseCase } from "@/@core/frontend/main/usecases/cart/removeCartItemFactory"
import { addCartItemUseCase } from "@/@core/frontend/main/usecases/cart/addCartItemFactory"
import { clearCartUseCase } from "@/@core/frontend/main/usecases/cart/clearCartFactory"
import { Cart, CartProps } from "@/@core/shared/entities/cart/cart"
import { getCartUseCase } from "@/@core/frontend/main/usecases/cart/getCartFactory"
import { cartLoadingInititalState } from "@/store/cartLoading/initialState"
import { cartLoadingReducer } from "@/store/cartLoading/reducer"
import { CartLoadingState } from "@/store/cartLoading/types"
import { SessionContext } from "./SessionContext"
import { emitToast } from "@/libs/react-toastify/utils"

interface CartContextProps {
    cart: CartProps
    loadingState: CartLoadingState
    addItem: (productId: string, quantity: number, options?: ActionOptions) => void
    removeItem: (productId: string, quantity: number) => void
    clearCart: () => void
}

interface ActionOptions {
    emitToast: boolean
}

const cartInitialState = Cart.empty().toJSON()

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export function CartProvider({ children }: PropsWithChildren) {
    const sessionState = useContext(SessionContext)
    const [cart, setCart] = useState<CartProps>(cartInitialState)
    const [loadingState, loadingDispatch] = useReducer(
        cartLoadingReducer,
        cartLoadingInititalState
    )

    useEffect(() => {
        ;(() => {
            if (sessionState.isLoading) return

            loadingDispatch({ type: "ENABLE" })

            return getCartUseCase
                .execute()
                .then((cart) => setCart(cart.toJSON()))
                .catch((error) => handleCartErrors(error, true))
                .finally(() => loadingDispatch({ type: "DISABLE" }))
        })()
    }, [sessionState.isLoading])

    async function removeItem(productId: string, quantity: number): Promise<void> {
        if (shouldBlockAction(productId) || quantity <= 0) return

        const timerRef = setTimeout(
            () => loadingDispatch({ type: "ENABLE", payload: { productId } }),
            200
        )

        return removeCartItemUseCase
            .execute({ productId, quantity })
            .then((cart) => handleCartUpdate(cart))
            .catch((error) => handleCartErrors(error, true))
            .finally(() => {
                clearTimeout(timerRef)
                loadingDispatch({ type: "DISABLE", payload: { productId } })
            })
    }

    async function clearCart(): Promise<void> {
        if (loadingState.isLoading || !cart.items.length) return

        loadingDispatch({ type: "CLEAR" })

        return clearCartUseCase
            .execute()
            .then((cart) => handleCartUpdate(cart))
            .catch((error) => handleCartErrors(error, true))
            .finally(() => loadingDispatch({ type: "DISABLE" }))
    }

    async function addItem(
        productId: string,
        quantity: number,
        options?: ActionOptions
    ): Promise<void> {
        if (shouldBlockAction(productId) || quantity <= 0) return

        let toastId: Id | null = null
        const timerRef = setTimeout(
            () => loadingDispatch({ type: "ENABLE", payload: { productId } }),
            200
        )

        if (options?.emitToast) {
            toastId = emitToast("loading", <CartAwaitingMessage />)
        }

        addCartItemUseCase
            .execute({ productId, quantity })
            .then((cart) => handleCartAddition(cart, productId, quantity, toastId))
            .catch((error) => handleCartErrors(error, true, toastId))
            .finally(() => {
                clearTimeout(timerRef)
                loadingDispatch({ type: "DISABLE", payload: { productId } })
            })
    }

    function shouldBlockAction(productId: string): boolean {
        const isProductAction = loadingState.currentProductIds.includes(productId)
        const isCleaning = loadingState.isLoading && !loadingState.currentProductIds.length

        return isProductAction || isCleaning
    }

    function handleCartErrors(error: Error, showToast: boolean, toastId?: Id | null): void {
        if (error.name === "UnauthorizedError") {
            return location.reload()
        }

        if (showToast) {
            if (toastId) {
                emitToast("error", error.message, { id: toastId, update: true })
            } else {
                emitToast("error", error.message)
            }
        }
    }

    function handleCartAddition(
        updatedCart: Cart | null,
        productId: string,
        quantity: number,
        toastId?: Id | null
    ): void {
        if (updatedCart) {
            const cartData = updatedCart.toJSON()
            const addedItem = cartData.items.find((item) => item.productId === productId)
            setCart(updatedCart.toJSON())
            if (toastId) {
                emitToast(
                    "success",
                    <SuccessAdditionMessage
                        quantity={quantity}
                        productName={addedItem?.name}
                    />,
                    { id: toastId, update: true }
                )
            }
        }
    }

    function handleCartUpdate(cart: Cart | null) {
        if (cart) {
            setCart(cart.toJSON())
        }
    }

    return (
        <CartContext.Provider value={{ loadingState, cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
