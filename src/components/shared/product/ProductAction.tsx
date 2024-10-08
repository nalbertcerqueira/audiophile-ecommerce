"use client"

import {
    CartAwaitingMessage,
    SuccessAdditionMessage
} from "@/libs/react-toastify/components/CartMessages"
import {
    selectBusyProductsLength,
    selectCartItems,
    selectCartStatus,
    addCartItem
} from "@/store/cart"
import { fetchTaxes, setCheckoutStatus } from "@/store/checkout"
import { handleHttpErrors } from "@/utils/helpers"
import { CartState } from "@/store/cart/types"
import { Counter } from "../Counter"
import { Id } from "react-toastify"
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks"
import { useState } from "react"
import { emitToast } from "@/libs/react-toastify/utils"
import { PrimaryButton } from "../buttons/PrimaryButton"
import { selectUserStatus } from "@/store/user/userSlice"

export function AddProductAction({ productId }: { productId: string }) {
    const dispatch = useAppDispatch()
    const [count, setCount] = useState<number>(0)
    const items = useAppSelector(selectCartItems)
    const cartStatus = useAppSelector(selectCartStatus)
    const busyProductsLength = useAppSelector(selectBusyProductsLength)
    const isSessionLoading = useAppSelector(selectUserStatus) === "loading"

    const isCartBusy = cartStatus !== "settled" || busyProductsLength > 0

    function handleAddItem(productId: string) {
        if (isCartBusy || isSessionLoading || count <= 0) {
            return
        }

        const toastId = emitToast("loading", <CartAwaitingMessage />)
        const itemRef = { quantity: count, productId }

        dispatch(setCheckoutStatus({ taxes: "loading" }))
        dispatch(addCartItem({ cartProps: { items }, itemRef }))
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
            <PrimaryButton
                disabled={isCartBusy}
                ariaDisabled={isCartBusy}
                onClick={() => handleAddItem(productId)}
                ariaLabel={count ? `add ${count} products to cart` : "can't add 0 products"}
            >
                ADD TO CART
            </PrimaryButton>
        </div>
    )
}
