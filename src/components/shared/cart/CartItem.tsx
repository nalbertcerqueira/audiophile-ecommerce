"use client"

import { staticProductImages } from "@/utils/imageMap"
import { CheckoutContext } from "@/contexts/CheckoutContext"
import { formatCurrency } from "@/utils/helpers"
import { ModalContext } from "@/contexts/ModalContext"
import { CartContext } from "@/contexts/CartContext"
import { RingLoader } from "../loaders/RingLoader"
import { Counter } from "../Counter"
import { useContext } from "react"
import Image from "next/image"

interface CartItemProps {
    readOnly?: boolean
    productId: string
    slug: string
    name: string
    quantity: number
    price: number
}

export function CartItem({ readOnly, name, productId, slug, quantity, price }: CartItemProps) {
    const { cartModal } = useContext(ModalContext)
    const { updateTaxes, setCheckoutStatus } = useContext(CheckoutContext)
    const { addItem, removeItem, setCartStatus, cartStatus, requestCount } =
        useContext(CartContext)

    async function handleRemoveItem() {
        const requestId = (requestCount.current += 1)
        const cartTimer = setCartStatus({ type: "ENABLE", payload: { productId } }, 200)
        const checkoutTimer = setCheckoutStatus(
            { isCheckingOut: false, isLoadingTaxes: true },
            400
        )

        await removeItem(productId, 1)
            .then((res) => {
                cartTimer && clearTimeout(cartTimer)
                setCartStatus({ type: "DISABLE", payload: { productId } })
                return res ? updateTaxes() : null
            })
            .then(() => {
                checkoutTimer && clearTimeout(checkoutTimer)
                if (requestCount.current === requestId) {
                    //Verificando se essa é a ultima (ou a única) requisição de remover items ao carrinho,
                    //para não interromper o loading antes da ultima requisição acabar.
                    setCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
                }
            })
    }

    async function handleAddItem() {
        const requestId = (requestCount.current += 1)
        const cartTimer = setCartStatus({ type: "ENABLE", payload: { productId } }, 250)
        const checkoutTimer = setCheckoutStatus(
            { isCheckingOut: false, isLoadingTaxes: true },
            500
        )

        await addItem(productId, 1)
            .then((res) => {
                cartTimer && clearTimeout(cartTimer)
                setCartStatus({ type: "DISABLE", payload: { productId } })
                return res ? updateTaxes() : null
            })
            .then(() => {
                checkoutTimer && clearTimeout(checkoutTimer)
                //Verificando se essa é a ultima (ou a única) requisição de adicionar items ao carrinho,
                //para não interromper o loading antes da ultima requisição acabar.
                if (requestCount.current === requestId) {
                    setCheckoutStatus({ isCheckingOut: false, isLoadingTaxes: false })
                }
            })
    }

    function isCartBusy() {
        const isLoading = cartStatus.currentProductIds.includes(productId)
        const isCleaning = cartStatus.isLoading && !cartStatus.currentProductIds.length

        return (isLoading && !readOnly) || (isCleaning && !readOnly)
    }

    return (
        <div
            aria-label={`${quantity} items of ${name} with ${price} dollars per unit`}
            className="cart-item"
        >
            <Image
                aria-hidden="true"
                className="cart-item__thumb"
                src={staticProductImages[slug].cartThumb}
                alt=""
            />
            <div className="cart-item__info">
                <div>
                    <p className="cart-item__name">{name.toUpperCase()}</p>
                    <p aria-label={`${price} dollars`} className="cart-item__price">
                        {formatCurrency(price)}
                    </p>
                </div>
                {readOnly && (
                    <p
                        aria-label={`${quantity} item${quantity > 1 ? "s" : ""}`.trim()}
                        className="cart-item__qty"
                    >{`x${quantity}`}</p>
                )}
            </div>
            {!readOnly && (
                <Counter
                    disabled={isCartBusy()}
                    count={quantity}
                    decrement={handleRemoveItem}
                    increment={handleAddItem}
                    className="cart-item__counter"
                    ariaLive={!readOnly ? (cartModal.isOpen ? "polite" : "off") : undefined}
                />
            )}
            {isCartBusy() && (
                <div className="btn-overlay btn-overlay--right">
                    <RingLoader className="ring-loader--cart-item" />
                </div>
            )}
        </div>
    )
}
