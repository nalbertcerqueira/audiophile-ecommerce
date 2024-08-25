"use client"

import { PrimaryButton } from "@/components/shared/buttons/PrimaryButton"
import { ConfirmationIcon } from "@/components/shared/icons/ConfirmationIcon"
import { useAppSelector } from "@/libs/redux/hooks"
import { formatCurrency } from "@/utils/helpers"
import { PropsWithChildren } from "react"

export function ModalRoot({ children }: PropsWithChildren) {
    const order = useAppSelector((state) => state.checkout.order.data)

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
                        {children}
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
                    <PrimaryButton
                        onClick={() => location.replace("/")}
                        className="order-confirmation__exit-btn"
                    >
                        BACK TO HOME
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}
