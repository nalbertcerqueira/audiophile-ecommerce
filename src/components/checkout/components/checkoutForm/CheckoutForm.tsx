"use client"

import { BillingDetailFields } from "./BillingDetailFields"
import { ShippingFields } from "./ShippingFields"
import { CheckoutFields } from "../../types/types"
import { PaymentFields } from "./PaymentFields"
import { CashIcon } from "@/components/shared/icons/CashIcon"
import { FormEvent, useEffect } from "react"
import { useCheckoutForm } from "./useCheckoutForm"
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks"
import { createOrder, selectTaxesStatus } from "@/store/checkout"
import { emitToast } from "@/libs/react-toastify/utils"
import { SuccessCheckoutMessage } from "@/libs/react-toastify/components/CheckoutMessages"
import { handleHttpErrors } from "@/utils/helpers"
import { Id } from "react-toastify"
import {
    selectCartStatus,
    selectCartItemsLength,
    selectBusyProductsLength
} from "@/store/cart"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { selectUserAddress, selectUserProfile } from "@/store/user"

const checkoutFormInitialState: CheckoutFields = {
    fullName: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "cash"
}

export function CheckoutForm({ formId }: { formId: string }) {
    const form = useCheckoutForm(checkoutFormInitialState)
    const cartStatus = useAppSelector(selectCartStatus)
    const busyProductsLength = useAppSelector(selectBusyProductsLength)
    const profile = useAppSelector(selectUserProfile)
    const address = useAppSelector(selectUserAddress)
    const reset = form.reset
    const getValues = form.getValues
    const dispatch = useAppDispatch()

    const isLoadingTaxes = useAppSelector(selectTaxesStatus) !== "settled"
    const isCartEmpty = useAppSelector(selectCartItemsLength) === 0
    const isCartBusy = cartStatus !== "settled" || busyProductsLength > 0
    const isLogged = useAppSelector((state) => state.user.isLogged)
    const submitBlocked = isCartEmpty || isCartBusy || isLoadingTaxes || form.isSubmitting

    useEffect(() => {
        if (profile.type !== "guest") {
            const { firstName, lastName, phone } = profile
            const fullName = `${firstName} ${lastName}`
            const values = getValues()
            reset({ ...values, ...address, fullName, phone: phone || "" })
        }
    }, [reset, getValues, profile, address])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (submitBlocked) return
        if (!isLogged) return location.assign("/signin")

        return await form.handleSubmit(handleSuccessfulSubmit)(e)
    }

    async function handleSuccessfulSubmit() {
        const toastId = emitToast("loading", "Processing your order. Please wait a moment...")
        return dispatch(createOrder())
            .unwrap()
            .then((order) => handleSuccess(order.orderId, toastId))
            .catch((error: Error) => handleHttpErrors(error, true, toastId))
    }

    function handleSuccess(orderId: string, toastId: Id) {
        form.reset({ ...checkoutFormInitialState })
        emitToast("success", <SuccessCheckoutMessage orderId={orderId} />, {
            toastId
        })
    }

    return (
        <>
            <SectionHeading>CHECKOUT</SectionHeading>
            <form id={formId} className="checkout-form" onSubmit={handleSubmit}>
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
                <div className="checkout-form__cash-guidance">
                    <CashIcon className="checkout-form__cash-icon" />
                    <p className="checkout-form__cash-info">
                        {
                            "The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled."
                        }
                    </p>
                </div>
            )}
        </>
    )
}
