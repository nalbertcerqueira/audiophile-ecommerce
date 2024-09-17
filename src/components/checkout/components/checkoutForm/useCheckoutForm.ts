"use client"

import { checkoutFieldsSchema } from "../../helpers/schemas"
import { CheckoutFields } from "../../types/types"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { customZodResolver } from "@/libs/zod/resolvers"

export function useCheckoutForm(initialState: CheckoutFields) {
    const {
        formState: { errors, isSubmitting },
        control,
        watch,
        register,
        handleSubmit,
        unregister,
        reset,
        getValues
    } = useForm<CheckoutFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: initialState,
        resolver: customZodResolver(checkoutFieldsSchema)
    })

    const paymentMethod = watch("paymentMethod")

    useEffect(() => {
        if (paymentMethod === "cash") {
            unregister(["cardNumber", "expMonth", "expYear", "cvv"], { keepValue: false })
        }
    }, [paymentMethod, unregister])

    return {
        control,
        errors,
        isSubmitting,
        paymentMethod,
        watch,
        register,
        handleSubmit,
        unregister,
        reset,
        getValues
    }
}
