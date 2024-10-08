"use client"

import { addCartItem, clearCart, fetchCart, removeCartItem, selectCart } from "@/store/cart"
import { useAppSelector } from "@/libs/redux/hooks"
import { SummaryField } from "./SummaryField"
import { AppDispatch } from "@/store/store"
import { CartItemCard } from "./CartItem"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { fetchTaxes, setCheckoutStatus, selectOrderStatus } from "@/store/checkout"
import { handleHttpErrors } from "@/utils/helpers"
import { PrimaryButton } from "../buttons/PrimaryButton"
import { selectUserStatus } from "@/store/user/userSlice"

export function MiniCart({ isOpen }: { isOpen: boolean }) {
    const dispatch = useDispatch<AppDispatch>()
    const requestRef = useRef<number>(0)
    const router = useRouter()
    const cart = useAppSelector(selectCart)
    const isCheckingOut = useAppSelector(selectOrderStatus) === "loading"
    const isSessionLoading = useAppSelector(selectUserStatus) === "loading"
    const isLogged = useAppSelector((state) => state.user.isLogged)
    const { items, itemCount, totalSpent, status } = cart

    //Buscando o carrinho de compras após o carregamento da página
    useEffect(() => {
        if (!isSessionLoading) {
            Promise.all([dispatch(fetchCart()).unwrap(), dispatch(fetchTaxes()).unwrap()])
                .catch((error: Error) => handleHttpErrors(error, true))
                .finally(() => dispatch(setCheckoutStatus({ taxes: "settled" })))
        }
    }, [isSessionLoading, dispatch])

    async function handleClearCart() {
        const isCartBusy = status.state !== "settled" || status.busyProducts.length > 0
        const actionBlocked = isCheckingOut || !items.length || isCartBusy

        if (actionBlocked) {
            return
        }

        dispatch(setCheckoutStatus({ taxes: "loading" }))
        dispatch(clearCart())
            .unwrap()
            .then(() => dispatch(fetchTaxes()))
            .catch((error: Error) => handleHttpErrors(error, true))
            .finally(() => dispatch(setCheckoutStatus({ taxes: "settled" })))
    }

    async function addOrRemoveItem(operation: "add" | "remove", productId: string) {
        const isProductBusy = status.busyProducts.includes(productId)
        const actionBlocked = isCheckingOut || isProductBusy || status.state !== "settled"

        if (actionBlocked) {
            return
        }

        const thunkAction = operation === "add" ? addCartItem : removeCartItem
        const requestId = (requestRef.current += 1)
        const itemRef = { quantity: 1, productId }

        dispatch(setCheckoutStatus({ taxes: "loading" }))
        dispatch(thunkAction({ cartProps: { items }, itemRef }))
            .unwrap()
            .then(() => dispatch(fetchTaxes()))
            .catch((error: Error) => handleHttpErrors(error, true))
            .finally(() => {
                const isSameRequest = requestId === requestRef.current
                isSameRequest && dispatch(setCheckoutStatus({ taxes: "settled" }))
            })
    }

    return (
        <div
            aria-hidden={isOpen ? "false" : "true"}
            id="shopping-cart"
            className={`mini-cart ${isOpen ? "" : "mini-cart--hidden"}`.trim()}
        >
            {isOpen && (
                <span className="screen-reader" aria-live="polite">
                    shopping cart is open
                </span>
            )}
            <div className="mini-cart__header">
                <h3 aria-label={`cart with ${itemCount} items`} className="mini-cart__title">
                    CART{" "}
                    <span aria-label={`${itemCount} items`} className="mini-cart__count">
                        ({itemCount})
                    </span>
                </h3>
                <button
                    onClick={handleClearCart}
                    aria-label="clear cart"
                    className="mini-cart__clear-btn"
                    type="button"
                >
                    Remove all
                </button>
            </div>
            <div className="mini-cart__items">
                {items.map((item) => (
                    <CartItemCard
                        key={item.productId}
                        slug={item.slug}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        readOnly={false}
                        isBusy={
                            isCheckingOut ||
                            status.state !== "settled" ||
                            status.busyProducts.includes(item.productId)
                        }
                        addItem={() => addOrRemoveItem("add", item.productId)}
                        removeItem={() => addOrRemoveItem("remove", item.productId)}
                    />
                ))}
            </div>
            <div className="mini-cart__total">
                <SummaryField
                    ariaLabel={`total of: ${totalSpent} dollars`}
                    name="TOTAL"
                    value={totalSpent}
                />
            </div>
            <PrimaryButton
                className="mini-cart__checkout-btn"
                onClick={() =>
                    isLogged ? router.push("/checkout") : window.location.assign("/signin")
                }
            >
                CHECKOUT
            </PrimaryButton>
        </div>
    )
}
