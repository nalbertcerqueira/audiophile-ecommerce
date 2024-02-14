"use client"

import { ConfirmationIcon } from "@/components/shared/icons/ConfirmationIcon"
import { CheckoutContext } from "@/contexts/CheckoutContext"
import { formatCurrency } from "@/utils/helpers"
import { CartItem } from "@/components/shared/cart/CartItem"
import { useContext, useEffect, useState } from "react"

export function ConfirmationModal() {
    const { order } = useContext(CheckoutContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const transitionTime = 500
    const gap = 16

    //Alterando dinamicamente a altura do container de items para criar o efeito accordion
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
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls="order-confirmation-items"
                    aria-label="expand or collapse items"
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
                <div
                    aria-live="polite"
                    aria-label="you can check here the details of your order. Thank you"
                    className="order-confirmation__modal"
                >
                    <ConfirmationIcon />
                    <h2 className="order-confirmation__title">
                        THANK YOU
                        <br />
                        FOR YOUR ORDER
                    </h2>
                    <p className="order-confirmation__message">
                        You will receive an email confirmation shortly.
                    </p>
                    <div className="order-confirmation__details">
                        <div className="order-confirmation__wrapper">
                            <div
                                aria-atomic="true"
                                aria-live="assertive"
                                style={{ gap: `${gap}px`, transition: `${transitionTime}ms` }}
                                className="order-confirmation__items"
                                id="order-confirmation-items"
                            >
                                {order.cartItems.map((item) => (
                                    <CartItem
                                        key={item.productId}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        slug={item.slug}
                                        readOnly
                                    />
                                ))}
                            </div>
                            <hr />
                            {renderToggleButton()}
                        </div>
                        <div
                            aria-label={`grand total of ${order.grandTotal} dollars`}
                            className="order-confirmation__total"
                        >
                            <p className="order-confirmation__total-label">GRAND TOTAL</p>
                            <p className="order-confirmation__total-value">
                                <b aria-label={`${order.grandTotal} dollars`}>
                                    {formatCurrency(order.grandTotal)}
                                </b>
                            </p>
                        </div>
                    </div>
                    <a href="/" className="btn btn--primary order-confirmation__exit-btn">
                        BACK TO HOME
                    </a>
                </div>
            </div>
        </div>
    )
}
