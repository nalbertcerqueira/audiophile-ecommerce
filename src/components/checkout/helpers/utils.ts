import { ChangeEvent } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { CheckoutFields } from "../types/types"

import { creditCardRegexp, textMatchRegexp, zipCodeRegexp } from "./constants"

export function maskZipCode(rawInput: string): string {
    return rawInput.replace(textMatchRegexp, "").slice(0, 8).replace(zipCodeRegexp, "$1-$2")
}

export function maskCreditCardNumber(rawInput: string): string {
    return rawInput
        .replace(textMatchRegexp, "")
        .slice(0, 16)
        .replace(creditCardRegexp, "$1 ")
        .trim()
}

export function maskExpirationMonth(rawInput: string): string {
    const month = parseInt(rawInput.replace(textMatchRegexp, "")) || 0

    if (month > 12) return `${12}`
    if (month < 1) return ""

    return `${month}`.slice(0, 2)
}

export function maskExpirationYear(rawInput: string): string {
    const month = parseInt(rawInput.replace(textMatchRegexp, "")) || ""
    return `${month}`.slice(0, 2)
}

export function maskCvv(rawInput: string): string {
    return rawInput.replace(textMatchRegexp, "").slice(0, 3)
}

export function sanitizeNumericField(input: string, maxLenght: number) {
    return input.replace(textMatchRegexp, "").slice(0, maxLenght)
}

export function handleNumericField(
    field: ControllerRenderProps<CheckoutFields, any>,
    maxLength: number
) {
    return (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = sanitizeNumericField(e.target.value || "", maxLength)
        const target = { ...e.target, value: newValue }
        const currentTarget = { ...e.currentTarget, value: newValue }
        field.onChange({ ...e, target, currentTarget })
    }
}

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
