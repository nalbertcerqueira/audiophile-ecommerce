"use client"

import { CartItem } from "@/components/shared/cart/CartItem"
import { useAppSelector } from "@/libs/redux/hooks"
import { useEffect, useState } from "react"

export function ModalItems() {
    const order = useAppSelector((state) => state.checkout.order.data)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const transitionTime = 500
    const gap = 16

    //Alterando dinamicamente a altura do container de items para criar o efeito accordion
    useEffect(() => {
        if (order) {
            const { item, itemsWrapper } = getElements()
            if (isOpen) {
                const gapsHeight = gap * order.items.length - 1
                const itemsHeight = item.clientHeight * order.items.length
                itemsWrapper.style.maxHeight = `${itemsHeight + gapsHeight}px`
            } else {
                itemsWrapper.style.maxHeight = `${item.clientHeight}px`
            }
        }
    }, [order, isOpen])

    function getElements() {
        const itemSelector = ".order-confirmation__items .cart-item"
        const wrapperSelector = ".order-confirmation__items"
        const itemsWrapper = document.querySelector(wrapperSelector) as HTMLElement
        const item = document.querySelector(itemSelector) as HTMLElement

        return { item, itemsWrapper }
    }

    function renderToggleButton() {
        if (order && order.items.length > 1) {
            return (
                <button
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls="order-confirmation-items"
                    aria-label="expand or collapse items"
                    onClick={() => setIsOpen((prevState) => !prevState)}
                    className="order-confirmation__toggle-btn"
                >
                    {isOpen ? `View less` : `and ${order.items.length - 1} other item(s)`}
                </button>
            )
        }
        return null
    }

    return (
        <div className="order-confirmation__wrapper">
            <div
                aria-atomic="true"
                aria-live="assertive"
                style={{ gap: `${gap}px`, transition: `${transitionTime}ms` }}
                className="order-confirmation__items"
                id="order-confirmation-items"
            >
                {order?.items.map((item) => (
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
    )

    return
}
