"use client"

import {
    PropsWithChildren,
    createContext,
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
    MutableRefObject
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

interface CartAdditionParams {
    cart: Cart | null
    productId: string
    quantity: number
}

interface CartContextProps {
    cart: CartProps
    loadingState: CartLoadingState
    requestCount: MutableRefObject<number>
    addItem: (productId: string, quantity: number, options?: ActionOptions) => Promise<boolean>
    clearCart: () => Promise<boolean>
    removeItem: (productId: string, quantity: number) => Promise<boolean>
    setCartLoadingStatus: (action: CartLoadingActions, delay?: number) => NodeJS.Timeout | void
}

interface ActionOptions {
    emitToast: boolean
}

const cartInitialState = Cart.empty().toJSON()

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export function CartProvider({ children }: PropsWithChildren) {
    const requestCount = useRef(0)
    const sessionState = useContext(SessionContext)
    const [cart, setCart] = useState<CartProps>(cartInitialState)
    const [loadingState, loadingDispatch] = useReducer(
        cartLoadingReducer,
        cartLoadingInititalState
    )

    //Buscando o carrinho de compras após a sessão ser validada
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
            .then((cart) => handleCartUpdate(cart))
            .catch((error) => handleCartErrors(error, true))

        return true
    }

    async function removeItem(productId: string, quantity: number): Promise<boolean> {
        if (shouldBlockAction(productId, quantity)) {
            return false
        }

        await removeCartItemUseCase
            .execute({ productId, quantity })
            .then((cart) => handleCartUpdate(cart))
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
            .then((cart) => handleCartAddition({ cart, productId, quantity }, toastId))
            .catch((error) => handleCartErrors(error, true, toastId))

        return true
    }

    function setCartLoadingStatus(
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

    function handleCartUpdate(cart: Cart | null) {
        if (cart) {
            setCart(cart.toJSON())
        }
    }

    function handleCartAddition(params: CartAdditionParams, toastId: Id | null): void {
        const { cart, productId, quantity } = params

        if (cart) {
            const cartProps = cart.toJSON()
            const addedItem = cartProps.items.find((item) => item.productId === productId)
            handleCartUpdate(cart)
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
                requestCount,
                loadingState,
                cart,
                addItem,
                removeItem,
                clearCart,
                setCartLoadingStatus
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
