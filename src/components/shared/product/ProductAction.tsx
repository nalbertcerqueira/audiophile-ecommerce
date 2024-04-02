"use client"

import {
    CartAwaitingMessage,
    SuccessAdditionMessage
} from "@/libs/react-toastify/components/CartMessages"
import { fetchTaxes, setCheckoutStatus } from "@/store/checkout"
import { handleHttpErrors } from "@/utils/helpers"
import { SessionContext } from "@/contexts/sessionContext/SessionContext"
import { addCartItem } from "@/store/cart"
import { CartState } from "@/store/cart/types"
import { Counter } from "../Counter"
import { Id } from "react-toastify"
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks"
import { useState, useContext } from "react"
import { emitToast } from "@/libs/react-toastify/utils"
import { selectBusyProductsLength, selectCartStatus } from "@/store/cart/cartSlice"

export function AddProductAction({ productId }: { productId: string }) {
    const dispatch = useAppDispatch()
    const [count, setCount] = useState<number>(0)
    const cartStatus = useAppSelector(selectCartStatus)
    const busyProductsLength = useAppSelector(selectBusyProductsLength)

    const isCartBusy = cartStatus !== "settled" || busyProductsLength > 0
    const { isLoading: isSessionLoading } = useContext(SessionContext)

    function handleAddItem(productId: string) {
        if (isCartBusy || isSessionLoading || count <= 0) {
            return
        }

        const toastId = emitToast("loading", <CartAwaitingMessage />)
        dispatch(setCheckoutStatus({ taxes: "loading" }))
        dispatch(addCartItem({ quantity: count, productId }))
            .unwrap()
            .then((data) => handleSuccess(data, toastId))
            .then(() => dispatch(fetchTaxes()))
            .catch((error: Error) => handleHttpErrors(error, true, toastId))
            .finally(() => dispatch(setCheckoutStatus({ taxes: "settled" })))
    }

    function handleSuccess(data: Omit<CartState, "status"> | undefined, toastId: Id) {
        const addedItem = data?.items.find((item) => item.productId === productId)
        emitToast(
            "success",
            <SuccessAdditionMessage quantity={count} productName={addedItem?.name} />,
            { toastId }
        )
        setCount(0)
    }

    return (
        <div className="product__cart-actions">
            <Counter
                disabled={isCartBusy}
                ariaLive={count ? "polite" : "off"}
                count={count}
                increment={() => setCount((prevCount) => prevCount + 1)}
                decrement={() =>
                    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount))
                }
            />
            <button
                disabled={isCartBusy}
                aria-disabled={isCartBusy}
                onClick={() => handleAddItem(productId)}
                className="btn btn--primary"
                aria-label={count ? `add ${count} products to cart` : "can't add 0 products"}
                type="button"
            >
                ADD TO CART
            </button>
        </div>
    )
}
