import { Id } from "react-toastify"
import { emitToast } from "@/libs/react-toastify/utils"

//Formatando valores monetários para en-US
export function formatCurrency(value: number): string {
    const valueWithCurrency = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value)

    return `${valueWithCurrency.slice(0, 1)} ${valueWithCurrency.slice(1)}`
}

//Formatando uma string para o formato capitalizado
export function toCapitalized(input?: string): string | undefined {
    return input ? `${input[0].toUpperCase()}${input.slice(1).toLowerCase()}` : undefined
}

//Verificando se o caminho de url passado como parâmetro faz parte da url alvo (atual url da página)
export function matchUrlPathname(currentPathname: string | null, target: string) {
    if (!currentPathname) {
        return false
    }

    if (currentPathname === "/" && target === "home") {
        return true
    }

    const pathList = currentPathname?.split("/")
    return pathList?.includes(target)
}

//Tratando o erro retornado por uma requisição http
export function handleHttpErrors(error: Error, showToast: boolean, toastId?: Id | null): void {
    if (error.name === "UnauthorizedError") {
        return location.reload()
    }

    if (showToast) {
        toastId
            ? emitToast("error", error.message, { toastId })
            : emitToast("error", error.message)
    }
}
