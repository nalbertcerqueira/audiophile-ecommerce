export function formatCurrency(value: number): string {
    const valueWithCurrency = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value)

    return `${valueWithCurrency.slice(0, 1)} ${valueWithCurrency.slice(1)}`
}

export function toCapitalized(input?: string): string | undefined {
    return input ? `${input[0].toUpperCase()}${input.slice(1).toLowerCase()}` : undefined
}
