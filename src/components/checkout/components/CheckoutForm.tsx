"use client"

import { createCheckoutOrderUseCase } from "@/@core/frontend/main/usecases/order/createCheckoutOrderFactory"
import { checkoutFieldsSchema } from "../helpers/schemas"
import { BillingDetailFields } from "./checkoutFields/BillingDetailFields"
import { CheckoutContext } from "@/contexts/CheckoutContext"
import { ShippingFields } from "./checkoutFields/ShippingFields"
import { CheckoutFields } from "../types/types"
import { SessionContext } from "@/contexts/SessionContext"
import { PaymentFields } from "./checkoutFields/PaymentFields"
import { CartContext } from "@/contexts/CartContext"
import { emitToast } from "@/libs/react-toastify/utils"
import { CashIcon } from "@/components/shared/icons/CashIcon"
import { FormEvent, useContext, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Id } from "react-toastify"
import { useForm } from "react-hook-form"
import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { successCheckoutMessage } from "@/libs/react-toastify/components/CheckoutMessages"

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
    const { cart, loadingState: cartLoadingState } = useContext(CartContext)
    const { isLogged } = useContext(SessionContext)
    const { status, updateCheckoutStatus, updateOrder } = useContext(CheckoutContext)
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
            const isCartBusy = cartLoadingState.isLoading
            const isLoadingTaxes = status.isLoadingTaxes

            if (isCartEmpty || isCartBusy || isLoadingTaxes || isSubmitting) {
                return
            }
        }

        return await handleSubmit(handleSuccessfulSubmit)(e)
    }

    async function handleSuccessfulSubmit() {
        let toastId: Id | undefined
        if (isLogged) {
            toastId = emitToast("loading", "Processing your order. Please wait a moment...")
        }

        updateCheckoutStatus((prevState) => ({ ...prevState, isCheckingOut: true }))

        await createCheckoutOrderUseCase
            .execute()
            .then((order) => handleCheckout(order, toastId))
            .catch((error) => handleError(error, toastId))
            .finally(() =>
                updateCheckoutStatus((prevState) => ({ ...prevState, isCheckingOut: false }))
            )
    }

    function handleCheckout(order: CheckoutOrder, toastId?: Id) {
        const { orderId, cartItems } = order.toJSON()

        if (toastId) {
            const successMsg = successCheckoutMessage(orderId)
            emitToast("success", successMsg, { id: toastId, update: true })
            updateOrder({
                orderId,
                cartItems,
                grandTotal: order.calculateGrandTotal()
            })
        }

        reset({ ...checkoutFormInitialState })
    }

    function handleError(error: Error, toastId?: Id) {
        updateOrder(null)
        if (error.name === "UnauthorizedError") {
            return location.assign("/signin")
        } else {
            if (toastId) {
                return emitToast("error", error.message, { id: toastId, update: true })
            }
        }
    }

    return (
        <div className="checkout">
            <h2 className="checkout__title">CHECKOUT</h2>
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
                        The &#8216;Cash on Delivery&#8217; option enables you to pay in cash
                        when our delivery courier arrives at your residence. Just make sure
                        your address is correct so that your order will not be cancelled.
                    </p>
                </div>
            )}
        </div>
    )
}
