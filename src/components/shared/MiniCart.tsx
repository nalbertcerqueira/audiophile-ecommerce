import { CartItem } from "./CartItem"
import Link from "next/link"

export function MiniCart({ isOpen }: { isOpen: boolean }) {
    return (
        <div className={`mini-cart ${isOpen ? "" : "mini-cart--hidden"}`.trim()}>
            <div className="mini-cart__header">
                <h2 className="mini-cart__title">
                    CART <span className="mini-cart__count">(4)</span>
                </h2>
                <button className="mini-cart__clear-btn" type="button">
                    Remove all
                </button>
            </div>
            <div className="mini-cart__items">
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
            <div className="mini-cart__total-summary">
                <p className="mini-cart__total-label">TOTAL</p>
                <p className="mini-cart__total-value">
                    <b>$ 5,396</b>
                </p>
            </div>
            <Link
                href="/"
                role="button"
                className="btn btn--primary mini-cart__checkout-btn"
                type="button"
            >
                CHECKOUT
            </Link>
        </div>
    )
}
