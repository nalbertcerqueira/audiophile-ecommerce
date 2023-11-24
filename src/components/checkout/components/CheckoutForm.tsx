"use client"

import { BillingDetailFields } from "./checkoutFields/BillingDetailFields"
import { ShippingFields } from "./checkoutFields/ShippingFields"
import { PaymentFields } from "./checkoutFields/PaymentFields"
import { CashIcon } from "@/components/shared/icons/CashIcon"
import { checkoutFieldsSchema } from "../helpers/schemas"
import { CheckoutFields } from "../types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

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
    const {
        watch,
        setValue,
        register,
        resetField,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<CheckoutFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: checkoutFormInitialState,
        resolver: zodResolver(checkoutFieldsSchema)
    })
    const paymentMethod = watch("paymentMethod")

    useEffect(() => setValue("paymentMethod", "cash"), [setValue])
    useEffect(() => {
        if (paymentMethod === "creditCard") {
            resetField("cardNumber")
            resetField("expDate")
            resetField("cvv")
        }
    }, [paymentMethod, resetField])

    return (
        <div className="checkout">
            <h2 className="checkout__title">CHECKOUT</h2>
            <form id={formId} className="checkout__form" onSubmit={handleSubmit(() => null)}>
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
                        The &#8216;Cash on Delivery&#8217; option enables you to pay in cash
                        when our delivery courier arrives at your residence. Just make sure
                        your address is correct so that your order will not be cancelled.
                    </p>
                </div>
            )}
        </div>
    )
}
