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
import { CartLoadingActions } from "@/store/cartLoading/types"
import { cartLoadingReducer } from "@/store/cartLoading/reducer"
import { CartLoadingState } from "@/store/cartLoading/types"
import { SessionContext } from "./SessionContext"
import { emitToast } from "@/libs/react-toastify/utils"

interface CartContextProps {
    cart: CartProps
    loadingState: CartLoadingState
    addItem: (productId: string, quantity: number, options?: ActionOptions) => Promise<boolean>
    clearCart: () => Promise<boolean>
    removeItem: (productId: string, quantity: number) => Promise<boolean>
    updateCartStatus: (action: CartLoadingActions, delay?: number) => NodeJS.Timeout | void
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
        if (!sessionState.isLoading) {
            loadingDispatch({ type: "ENABLE" })

            getCartUseCase
                .execute()
                .then((cart) => setCart(cart.toJSON()))
                .catch((error) => handleCartErrors(error, true))
                .finally(() => loadingDispatch({ type: "DISABLE" }))
        }
    }, [sessionState.isLoading])

    async function clearCart(): Promise<boolean> {
        if (loadingState.isLoading || !cart.items.length) {
            return false
        }

        await clearCartUseCase
            .execute()
            .then((cart) => (cart ? setCart(cart.toJSON()) : null))
            .catch((error) => handleCartErrors(error, true))
            .finally(() => loadingDispatch({ type: "DISABLE" }))

        return true
    }

    async function removeItem(productId: string, quantity: number): Promise<boolean> {
        if (shouldBlockAction(productId, quantity)) {
            return false
        }

        await removeCartItemUseCase
            .execute({ productId, quantity })
            .then((cart) => (cart ? setCart(cart.toJSON()) : null))
            .catch((error) => handleCartErrors(error, true))

        return true
    }

    async function addItem(
        productId: string,
        quantity: number,
        options?: ActionOptions
    ): Promise<boolean> {
        if (shouldBlockAction(productId, quantity)) {
            return false
        }

        let toastId: Id | null = null
        if (options?.emitToast) {
            toastId = emitToast("loading", <CartAwaitingMessage />)
        }

        await addCartItemUseCase
            .execute({ productId, quantity })
            .then((cart) => handleCartAddition(cart, productId, quantity, toastId))
            .catch((error) => handleCartErrors(error, true, toastId))

        return true
    }

    function updateCartStatus(
        action: CartLoadingActions,
        delay?: number
    ): NodeJS.Timeout | void {
        if (delay) {
            const timerRef = setTimeout(() => loadingDispatch(action), delay)
            return timerRef
        }

        return loadingDispatch(action)
    }

    function shouldBlockAction(productId: string, quantity: number): boolean {
        const isProductAction = loadingState.currentProductIds.includes(productId)
        const isCleaning = loadingState.isLoading && !loadingState.currentProductIds.length

        return isProductAction || isCleaning || quantity <= 0
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

    return (
        <CartContext.Provider
            value={{
                loadingState,
                cart,
                addItem,
                removeItem,
                clearCart,
                updateCartStatus
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
