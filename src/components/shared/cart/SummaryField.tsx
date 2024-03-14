import { formatCurrency } from "@/utils/helpers"

interface SummaryFieldProps {
    name: string
    value: number
    ariaLabel?: string
}

export function SummaryField({ name, value, ariaLabel }: SummaryFieldProps) {
    return (
        <p aria-label={ariaLabel} className="summary-field">
            <span className="summary-field__name">{name}</span>
            <span aria-label={`${value} dollars`} className="summary-field__value">
                {formatCurrency(value)}
            </span>
        </p>
    )
}
