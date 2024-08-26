import { ChangeEvent } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { CheckoutFields } from "../types/types"

import { creditCardRegexp, textMatchRegexp, zipCodeRegexp } from "./variables"

//Máscara de input para CEP
export function maskZipCode(rawInput: string): string {
    return rawInput.replace(textMatchRegexp, "").slice(0, 8).replace(zipCodeRegexp, "$1-$2")
}

//Máscara de input para nº de cartão de crédito
export function maskCreditCardNumber(rawInput: string): string {
    return rawInput
        .replace(textMatchRegexp, "")
        .slice(0, 16)
        .replace(creditCardRegexp, "$1 ")
        .trim()
}

//Máscara para o mês de expiração do cartão
export function maskExpirationMonth(rawInput: string): string {
    const month = parseInt(rawInput.replace(textMatchRegexp, "")) || 0

    if (month > 12) return `${12}`
    if (month < 1) return ""

    return `${month}`.slice(0, 2)
}

//Máscara para o ano de expiração do cartão
export function maskExpirationYear(rawInput: string): string {
    const month = parseInt(rawInput.replace(textMatchRegexp, "")) || ""
    return `${month}`.slice(0, 2)
}

//Máscara para o código CVV do carto
export function maskCvv(rawInput: string): string {
    return rawInput.replace(textMatchRegexp, "").slice(0, 3)
}

//Sanitizando entradas numéricas em strings
export function sanitizeNumericField(input: string, maxLength: number) {
    return input.replace(textMatchRegexp, "").slice(0, maxLength)
}

//Adapter para manipular inputs numéricos
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

//Adapter para manipular a data de expiração do cartão
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
