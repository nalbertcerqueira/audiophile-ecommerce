"use client"

import { ConfirmationIcon } from "@/components/shared/icons/ConfirmationIcon"
import { CheckoutContext } from "@/contexts/CheckoutContext"
import { formatCurrency } from "@/utils/helpers"
import { CartItem } from "@/components/shared/cart/CartItem"
import { useContext, useEffect, useState } from "react"

export function ConfirmationModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const transitionTime = 500
    const gap = 16

    const { order } = useContext(CheckoutContext)

    useEffect(() => {
        if (order?.cartItems) {
            const { item, itemsWrapper } = getElements()

            if (isOpen) {
                const gapsHeight = gap * order.cartItems.length - 1
                const itemsHeight = item.clientHeight * order.cartItems.length
                itemsWrapper.style.maxHeight = `${itemsHeight + gapsHeight}px`
            } else {
                itemsWrapper.style.maxHeight = `${item.clientHeight}px`
            }
        }
    }, [order?.cartItems, isOpen])

    function getElements() {
        const itemSelector = ".order-confirmation__items .cart-item"
        const wrapperSelector = ".order-confirmation__items"
        const itemsWrapper = document.querySelector(wrapperSelector) as HTMLElement
        const item = document.querySelector(itemSelector) as HTMLElement

        return { item, itemsWrapper }
    }

    function renderToggleButton() {
        if (order && order.cartItems.length > 1) {
            return (
                <button
                    onClick={() => setIsOpen((prevState) => !prevState)}
                    className="order-confirmation__toggle-btn"
                >
                    {isOpen ? `View less` : `and ${order.cartItems.length - 1} other item(s)`}
                </button>
            )
        }
        return null
    }

    if (!order) {
        return null
    }

    return (
        <div className="order-confirmation">
            <div className="order-confirmation__inner-container">
                <div className="order-confirmation__modal">
                    <ConfirmationIcon />
                    <h3 className="order-confirmation__title">
                        THANK YOU
                        <br />
                        FOR YOUR ORDER
                    </h3>
                    <p className="order-confirmation__message">
                        You will receive an email confirmation shortly.
                    </p>
                    <div className="order-confirmation__details">
                        <div className="order-confirmation__wrapper">
                            <div
                                style={{ gap: `${gap}px`, transition: `${transitionTime}ms` }}
                                className="order-confirmation__items"
                            >
                                {order.cartItems.map((item) => (
                                    <CartItem
                                        key={item.productId}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        productId={item.productId}
                                        slug={item.slug}
                                        readOnly
                                    />
                                ))}
                            </div>
                            <hr />
                            {renderToggleButton()}
                        </div>
                        <div className="order-confirmation__total">
                            <p className="order-confirmation__total-label">GRAND TOTAL</p>
                            <p className="order-confirmation__total-value">
                                <b>{formatCurrency(order.grandTotal)}</b>
                            </p>
                        </div>
                    </div>
                    <a
                        role="button"
                        href="/"
                        className="btn btn--primary order-confirmation__exit-btn"
                    >
                        BACK TO HOME
                    </a>
                </div>
            </div>
        </div>
    )
}
