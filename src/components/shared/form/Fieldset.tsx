import { ReactNode } from "react"

interface FieldsetProps {
    title: string
    children: ReactNode
    className?: string
    fieldsClassName?: string
}

export function Fieldset({ title, className, fieldsClassName, children }: FieldsetProps) {
    return (
        <fieldset className={`fieldset ${className || ""}`.trim()}>
            <legend className="fieldset__title">{title}</legend>
            <div className={`fieldset__fields ${fieldsClassName || ""}`.trim()}>
                {children}
            </div>
        </fieldset>
    )
}
