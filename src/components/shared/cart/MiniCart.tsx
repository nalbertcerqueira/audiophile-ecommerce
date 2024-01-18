"use client"

import { CartContext } from "@/contexts/CartContext"
import { formatCurrency } from "@/utils/helpers"
import { SummaryField } from "./SummaryField"
import { CartItem } from "./CartItem"
import { useContext } from "react"
import Link from "next/link"

export function MiniCart({ isOpen }: { isOpen: boolean }) {
    const { cart, clearCart } = useContext(CartContext)

    return (
        <div className={`mini-cart ${isOpen ? "" : "mini-cart--hidden"}`.trim()}>
            <div className="mini-cart__header">
                <h3 className="mini-cart__title">
                    CART <span className="mini-cart__count">({cart.itemCount})</span>
                </h3>
                <button
                    onClick={clearCart}
                    aria-label="clear cart"
                    className="mini-cart__clear-btn"
                    type="button"
                >
                    Remove all
                </button>
            </div>
            <div className="mini-cart__items">
                {cart.items.map((item) => (
                    <CartItem
                        key={item.productId}
                        productId={item.productId}
                        slug={item.slug}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                    />
                ))}
            </div>
            <div className="mini-cart__total">
                <SummaryField name="TOTAL" value={formatCurrency(cart.totalSpent)} />
            </div>
            <Link
                href="/checkout"
                role="button"
                className="btn btn--primary mini-cart__checkout-btn"
                type="button"
            >
                CHECKOUT
            </Link>
        </div>
    )
}
