type MinOrMax = "min" | "max"

export function lengthErrorMessage(fieldName: string, type: MinOrMax, value: number): string {
    if (type === "max") {
        return `${fieldName} cannot have more than ${value} character(s)`
    }
    return `${fieldName} must have at least ${value} character(s)`
}
