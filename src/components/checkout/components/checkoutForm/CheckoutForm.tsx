"use client"

import { BillingDetailFields } from "./BillingDetailFields"
import { CheckoutContext } from "@/contexts/checkoutContext/CheckoutContext"
import { ShippingFields } from "./ShippingFields"
import { CheckoutFields } from "../../types/types"
import { SessionContext } from "@/contexts/sessionContext/SessionContext"
import { PaymentFields } from "./PaymentFields"
import { CartContext } from "@/contexts/cartContext/CartContext"
import { CashIcon } from "@/components/shared/icons/CashIcon"
import { FormEvent, useContext } from "react"
import { useCheckoutForm } from "./useCheckoutForm"

const checkoutFormInitialState: CheckoutFields = {
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "cash"
}
export function CheckoutForm({ formId }: { formId: string }) {
    const { checkoutStatus, createOrder } = useContext(CheckoutContext)
    const { cart, cartStatus } = useContext(CartContext)
    const { isLogged } = useContext(SessionContext)
    const form = useCheckoutForm(checkoutFormInitialState)

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const preventSubmit = shouldPreventSubmit()

        if (!isLogged) return location.assign("/signin")
        if (preventSubmit) return

        return await form.handleSubmit(handleSuccessfulSubmit)(e)
    }

    async function handleSuccessfulSubmit() {
        return createOrder(isLogged).then(() => form.reset({ ...checkoutFormInitialState }))
    }

    function shouldPreventSubmit() {
        const isCartEmpty = !cart.items
        const isCartBusy = cartStatus.isLoading
        const isLoadingTaxes = checkoutStatus.isLoadingTaxes

        return isCartEmpty || isCartBusy || isLoadingTaxes || form.isSubmitting
    }

    return (
        <div className="checkout">
            <h1 className="checkout__title">CHECKOUT</h1>
            <form id={formId} className="checkout__form" onSubmit={handleFormSubmit}>
                <BillingDetailFields
                    fieldsetTitle="BILLING DETAILS"
                    control={form.control}
                    formErrors={form.errors}
                    register={form.register}
                />
                <ShippingFields
                    fieldsetTitle="SHIPPING INFO"
                    control={form.control}
                    formErrors={form.errors}
                    register={form.register}
                />
                <PaymentFields
                    fieldsetTitle="PAYMENT DETAILS"
                    control={form.control}
                    formErrors={form.errors}
                    currentPaymentMethod={form.paymentMethod}
                    register={form.register}
                />
            </form>
            {form.paymentMethod === "cash" && (
                <div className="checkout__cash-guidance">
                    <CashIcon className="checkout__cash-icon" />
                    <p className="checkout__cash-info">
                        {
                            "The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled."
                        }
                    </p>
                </div>
            )}
        </div>
    )
}
