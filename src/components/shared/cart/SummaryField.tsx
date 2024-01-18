interface SummaryFieldProps {
    name: string
    value: string
}

export function SummaryField({ name, value }: SummaryFieldProps) {
    return (
        <p className="summary-field">
            <span className="summary-field__name">{name}</span>
            <span className="summary-field__value">{value}</span>
        </p>
    )
}
