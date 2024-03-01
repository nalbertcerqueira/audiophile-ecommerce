"use client"

import { checkoutFieldsSchema } from "../helpers/schemas"
import { BillingDetailFields } from "./checkoutFields/BillingDetailFields"
import { CheckoutContext } from "@/contexts/CheckoutContext"
import { ShippingFields } from "./checkoutFields/ShippingFields"
import { CheckoutFields } from "../types/types"
import { SessionContext } from "@/contexts/SessionContext"
import { PaymentFields } from "./checkoutFields/PaymentFields"
import { CartContext } from "@/contexts/CartContext"
import { CashIcon } from "@/components/shared/icons/CashIcon"
import { FormEvent, useContext, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const checkoutFormInitialState: CheckoutFields = {
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
    const { isLogged } = useContext(SessionContext)
    const { cart, cartStatus } = useContext(CartContext)
    const { checkoutStatus, createOrder } = useContext(CheckoutContext)
    const {
        formState: { errors, isSubmitting },
        control,
        watch,
        register,
        handleSubmit,
        unregister,
        reset
    } = useForm<CheckoutFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: checkoutFormInitialState,
        resolver: zodResolver(checkoutFieldsSchema)
    })
    const paymentMethod = watch("paymentMethod")

    useEffect(() => {
        if (paymentMethod === "cash") {
            unregister(["cardNumber", "expDate", "cvv"], { keepValue: false })
        }
    }, [paymentMethod, unregister])

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        const shouldStopSubmit = shouldPreventSubmit()
        e.preventDefault()

        if (!isLogged) return location.assign("/signin")
        if (shouldStopSubmit) return

        return await handleSubmit(handleSuccessfulSubmit)(e)
    }

    async function handleSuccessfulSubmit() {
        return createOrder(isLogged).then(() => reset({ ...checkoutFormInitialState }))
    }

    function shouldPreventSubmit() {
        const isCartEmpty = !cart.items
        const isCartBusy = cartStatus.isLoading
        const isLoadingTaxes = checkoutStatus.isLoadingTaxes

        return isCartEmpty || isCartBusy || isLoadingTaxes || isSubmitting
    }

    return (
        <div className="checkout">
            <h1 className="checkout__title">CHECKOUT</h1>
            <form id={formId} className="checkout__form" onSubmit={handleFormSubmit}>
                <BillingDetailFields
                    fieldsetTitle="BILLING DETAILS"
                    control={control}
                    formErrors={errors}
                    register={register}
                />
                <ShippingFields
                    fieldsetTitle="SHIPPING INFO"
                    control={control}
                    formErrors={errors}
                    register={register}
                />
                <PaymentFields
                    fieldsetTitle="PAYMENT DETAILS"
                    control={control}
                    formErrors={errors}
                    currentPaymentMethod={paymentMethod}
                    register={register}
                />
            </form>
            {paymentMethod === "cash" && (
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
