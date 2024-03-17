"use client"

import {
    PropsWithChildren,
    createContext,
    useState,
    useEffect,
    useReducer,
    useRef,
    useContext
} from "react"
import {
    CartAwaitingMessage,
    SuccessAdditionMessage
} from "@/libs/react-toastify/components/CartMessages"
import { CustomCart, ActionOptions, CartAdditionParams, CartContextProps } from "./types"
import { cartLoadingInitialState } from "@/store/cartLoading/initialState"
import { removeCartItemUseCase } from "@/@core/frontend/main/usecases/cart/removeCartItemFactory"
import { addCartItemUseCase } from "@/@core/frontend/main/usecases/cart/addCartItemFactory"
import { cartLoadingReducer } from "@/store/cartLoading/reducer"
import { CartLoadingActions } from "@/store/cartLoading/types"
import { clearCartUseCase } from "@/@core/frontend/main/usecases/cart/clearCartFactory"
import { getCartUseCase } from "@/@core/frontend/main/usecases/cart/getCartFactory"
import { SessionContext } from "../sessionContext/SessionContext"
import { emitToast } from "@/libs/react-toastify/utils"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { Id } from "react-toastify"

const cartInitialState: CustomCart = { itemCount: 0, totalSpent: 0, items: [] }

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export function CartProvider({ children }: PropsWithChildren) {
    const requestCount = useRef(0)
    const sessionContext = useContext(SessionContext)
    const [cart, setCart] = useState<CustomCart>(cartInitialState)
    const [loadingState, loadingDispatch] = useReducer(
        cartLoadingReducer,
        cartLoadingInitialState
    )

    //Buscando o carrinho de compras após o carregamento da página
    useEffect(() => {
        if (sessionContext.isLoading) return

        loadingDispatch({ type: "ENABLE" })
        getCartUseCase
            .execute()
            .then((cart) => handleCartUpdate(cart))
            .catch((error: Error) => handleCartErrors(error, true))
            .finally(() => loadingDispatch({ type: "DISABLE" }))
    }, [sessionContext.isLoading])

    async function clearCart(): Promise<boolean> {
        if (loadingState.isLoading || !cart.items.length) {
            return false
        }

        await clearCartUseCase
            .execute()
            .then((cart) => handleCartUpdate(cart))
            .catch((error: Error) => handleCartErrors(error, true))

        return true
    }

    async function removeItem(productId: string, quantity: number): Promise<boolean> {
        if (isCartBusy(productId, quantity)) {
            return false
        }

        await removeCartItemUseCase
            .execute({ productId, quantity })
            .then((cart) => handleCartUpdate(cart))
            .catch((error: Error) => handleCartErrors(error, true))

        return true
    }

    async function addItem(
        productId: string,
        quantity: number,
        options?: ActionOptions
    ): Promise<boolean> {
        if (isCartBusy(productId, quantity)) {
            return false
        }

        let toastId: Id | null = null
        if (options?.emitToast) {
            toastId = emitToast("loading", <CartAwaitingMessage />)
        }

        await addCartItemUseCase
            .execute({ productId, quantity })
            .then((cart) => handleCartAddition({ cart, productId, quantity }, toastId))
            .catch((error: Error) => handleCartErrors(error, true, toastId))

        return true
    }

    function setCartLoadingStatus(action: CartLoadingActions): void {
        return loadingDispatch(action)
    }

    function isCartBusy(productId: string, quantity?: number): boolean {
        const isProductAction = loadingState.currentProductIds.includes(productId)
        const isCleaning = loadingState.isLoading && !loadingState.currentProductIds.length

        return typeof quantity === "number"
            ? isProductAction || isCleaning || quantity <= 0
            : isProductAction || isCleaning
    }

    function handleCartErrors(error: Error, showToast: boolean, toastId?: Id | null): void {
        if (error.name === "UnauthorizedError") {
            return location.reload()
        }

        if (showToast) {
            toastId
                ? emitToast("error", error.message, { id: toastId, update: true })
                : emitToast("error", error.message)
        }
    }

    function handleCartUpdate(cart: Cart | null) {
        if (cart) {
            const { items } = cart.toJSON()
            setCart({ items, itemCount: cart.getCount(), totalSpent: cart.getTotalSpent() })
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
                cartStatus: loadingState,
                cart,
                addItem,
                removeItem,
                clearCart,
                isCartBusy,
                setCartStatus: setCartLoadingStatus
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
