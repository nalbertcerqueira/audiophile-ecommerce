import { textMatchRegexp, zipCodeRegexp, creditCardRegexp } from "./variables"

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
