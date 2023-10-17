export function formatCurrency(value: number) {
    const valueWithCurrency = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value)

    return `${valueWithCurrency.slice(0, 1)} ${valueWithCurrency.slice(1)}`
}
