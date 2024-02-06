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
        watch,
        setValue,
        register,
        handleSubmit,
        unregister,
        reset,
        control,
        formState: { errors, isSubmitting }
    } = useForm<CheckoutFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: checkoutFormInitialState,
        resolver: zodResolver(checkoutFieldsSchema)
    })
    const paymentMethod = watch("paymentMethod")

    useEffect(() => setValue("paymentMethod", "cash"), [setValue])

    useEffect(() => {
        if (paymentMethod === "cash") {
            unregister("cardNumber", { keepValue: false })
            unregister("expDate", { keepValue: false })
            unregister("cvv", { keepValue: false })
        }
    }, [paymentMethod, unregister])

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!isLogged) {
            return location.assign("/signin")
        } else {
            const isCartEmpty = !cart.items
            const isCartBusy = cartStatus.isLoading
            const isLoadingTaxes = checkoutStatus.isLoadingTaxes

            if (isCartEmpty || isCartBusy || isLoadingTaxes || isSubmitting) {
                return
            }
        }

        return await handleSubmit(handleSuccessfulSubmit)(e)
    }

    async function handleSuccessfulSubmit() {
        const withToast = isLogged

        return createOrder(withToast).then(() => {
            reset({ ...checkoutFormInitialState })
        })
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
