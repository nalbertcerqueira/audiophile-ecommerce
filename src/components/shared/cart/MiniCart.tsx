import { CartItem } from "./CartItem"
import Link from "next/link"
import { SummaryField } from "./SummaryField"

export function MiniCart({ isOpen }: { isOpen: boolean }) {
    return (
        <div className={`mini-cart ${isOpen ? "" : "mini-cart--hidden"}`.trim()}>
            <div className="mini-cart__header">
                <h3 className="mini-cart__title">
                    CART <span className="mini-cart__count">(4)</span>
                </h3>
                <button aria-label="clear cart" className="mini-cart__clear-btn" type="button">
                    Remove all
                </button>
            </div>
            <div className="mini-cart__items">
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
            <div className="mini-cart__total">
                <SummaryField name="TOTAL" value="$ 5,396" />
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
