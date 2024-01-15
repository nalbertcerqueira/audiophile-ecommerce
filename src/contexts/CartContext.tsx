"use client"

import { Cart, CartProps } from "@/@core/shared/entities/cart/cart"
import { getCartUseCase } from "@/@core/frontend/main/usecases/cart/getCartFactory"
import { clearCartUseCase } from "@/@core/frontend/main/usecases/cart/clearCartFactory"
import { addCartItemUseCase } from "@/@core/frontend/main/usecases/cart/addCartItemFactory"
import { removeCartItemUseCase } from "@/@core/frontend/main/usecases/cart/removeCartItemFactory"
import { CartLoadingState } from "@/store/cartLoading/types"
import { cartLoadingReducer } from "@/store/cartLoading/reducer"
import { cartLoadingInititalState } from "@/store/cartLoading/initialState"
import { SessionContext } from "./SessionContext"
import { emitToast } from "@/libs/react-toastify/utils"
import { Id } from "react-toastify"
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
        if (!sessionState.isLoading) {
            getCart()
        }
    }, [sessionState.isLoading])

    async function getCart(): Promise<void> {
        loadingDispatch({ type: "ENABLE" })

        return getCartUseCase
            .execute()
            .then((cart) => setCart(cart.toJSON()))
            .catch((error) => {
                if (error.name !== "UnauthorizedError") emitToast("error", error.message)
            })
            .finally(() => loadingDispatch({ type: "DISABLE" }))
    }

    async function removeItem(productId: string, quantity: number): Promise<void> {
        if (shouldBlockAction(productId)) return

        const timerRef = setTimeout(
            () => loadingDispatch({ type: "ENABLE", payload: { productId } }),
            200
        )

        return removeCartItemUseCase
            .execute({ productId, quantity })
            .then((cart) => {
                if (cart) setCart(cart.toJSON())
            })
            .catch((error) => {
                if (error.name === "UnauthorizedError") location.reload()
                else emitToast("error", error.message)
            })
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
            .then((cart) => setCart(cart.toJSON()))
            .catch((error) => {
                if (error.name === "UnauthorizedError") location.reload()
                else emitToast("error", error.messsage)
            })
            .finally(() => loadingDispatch({ type: "DISABLE" }))
    }

    async function addItem(
        productId: string,
        quantity: number,
        options?: ActionOptions
    ): Promise<void> {
        if (shouldBlockAction(productId)) return

        let toastId: Id = 0
        const timerRef = setTimeout(
            () => loadingDispatch({ type: "ENABLE", payload: { productId } }),
            200
        )

        if (options?.emitToast) {
            toastId = emitToast("loading", <CartAwaitingMessage />)
        }

        addCartItemUseCase
            .execute({ productId, quantity })
            .then((cart) => {
                if (cart) {
                    const cartData = cart.toJSON()
                    const addedItem = cartData.items.find(
                        (item) => item.productId === productId
                    )
                    setCart(cart.toJSON())
                    emitToast(
                        "success",
                        <SuccessAdditionMessage
                            quantity={quantity}
                            productName={addedItem?.name}
                        />,
                        { id: toastId, update: true }
                    )
                }
            })
            .catch((error) => {
                if (error.name === "UnauthorizedError") {
                    return location.reload()
                }

                if (options?.emitToast) {
                    return emitToast("error", error.message, { id: toastId, update: true })
                } else {
                    return emitToast("error", error.message)
                }
            })
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

    return (
        <CartContext.Provider value={{ loadingState, cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
