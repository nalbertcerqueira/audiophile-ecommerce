"use client"

import { staticProductImages } from "@/utils/imageMap"
import { formatCurrency } from "@/utils/helpers"
import { ModalContext } from "@/contexts/ModalContext"
import { RingLoader } from "../loaders/RingLoader"
import { Counter } from "../Counter"
import { useContext } from "react"
import Image from "next/image"

interface CartItemProps {
    slug: string
    name: string
    quantity: number
    price: number
}

interface CartItemWithActions extends CartItemProps {
    readOnly: false
    isBusy: boolean
    addItem: () => void
    removeItem: () => void
}

interface CartItemWithoutAction extends CartItemProps {
    readOnly: true
}

export function CartItem(props: CartItemWithActions | CartItemWithoutAction) {
    const { readOnly, name, slug, quantity, price } = props
    const { cartModal } = useContext(ModalContext)

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
                    disabled={!readOnly && props.isBusy}
                    count={quantity}
                    decrement={props.removeItem}
                    increment={props.addItem}
                    className="cart-item__counter"
                    ariaLive={!readOnly ? (cartModal.isOpen ? "polite" : "off") : undefined}
                />
            )}
            {!readOnly && props.isBusy && (
                <div className="btn-overlay btn-overlay--right">
                    <RingLoader className="ring-loader--cart-item" />
                </div>
            )}
        </div>
    )
}
