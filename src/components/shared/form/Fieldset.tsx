import { ReactNode } from "react"

interface FieldsetProps {
    title: string
    children: ReactNode
    className?: string
}

export function Fieldset({ title, className, children }: FieldsetProps) {
    return (
        <fieldset className={`fieldset ${className || ""}`.trim()}>
            <legend className="fieldset__title">{title}</legend>
            <div className="fieldset__fields">{children}</div>
        </fieldset>
    )
}
