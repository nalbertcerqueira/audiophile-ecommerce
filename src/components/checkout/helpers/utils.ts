import { ChangeEvent } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { CheckoutFields } from "../types/types"
import { maskExpirationMonth } from "@/utils/masks"
import { sanitizeNumericField } from "@/utils/helpers"

//Adapter para manipular a data de vencimento do cartão
export function handleExpirationDate(
    field: ControllerRenderProps<CheckoutFields, any>,
    type: "month" | "year"
) {
    return (e: ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = sanitizeNumericField(e.target.value || "", 2)
        let value = 0

        if (type === "month") {
            value = parseInt(maskExpirationMonth(sanitizedValue)) || 0
        } else {
            value = parseInt(sanitizedValue) || 0
        }

        const target = { ...e.target, value }
        const currentTarget = { ...e.currentTarget, value }
        field.onChange({ ...e, target, currentTarget })
    }
}
