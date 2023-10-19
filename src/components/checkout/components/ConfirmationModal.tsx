import { ConfirmationIcon } from "@/components/shared/icons/ConfirmationIcon"
import { CartItem } from "@/components/shared/cart/CartItem"
import Link from "next/link"

export function ConfirmationModal() {
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
                            <div className="order-confirmation__items">
                                <CartItem readOnly />
                            </div>
                            <hr />
                            <button className="order-confirmation__toggle-btn">
                                and 2 other item(s)
                            </button>
                        </div>
                        <div className="order-confirmation__total">
                            <p className="order-confirmation__total-label">GRAND TOTAL</p>
                            <p className="order-confirmation__total-value">
                                <b>$ 5,446</b>
                            </p>
                        </div>
                    </div>
                    <Link
                        role="button"
                        href="/"
                        className="btn btn--primary order-confirmation__exit-btn"
                    >
                        BACK TO HOME
                    </Link>
                </div>
            </div>
        </div>
    )
}
