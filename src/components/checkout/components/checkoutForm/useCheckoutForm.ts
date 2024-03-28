import { checkoutFieldsSchema } from "../../helpers/schemas"
import { CheckoutFields } from "../../types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function useCheckoutForm(initialState: CheckoutFields) {
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
        defaultValues: initialState,
        resolver: zodResolver(checkoutFieldsSchema)
    })

    const paymentMethod = watch("paymentMethod")

    useEffect(() => {
        if (paymentMethod === "cash") {
            unregister(["cardNumber", "expDate", "cvv"], { keepValue: false })
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
        reset
    }
}
