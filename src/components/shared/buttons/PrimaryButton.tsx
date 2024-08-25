import { ButtonHTMLAttributes, ReactNode } from "react"

interface primaryButtonProps {
    children: ReactNode
    onClick?: () => void
    ariaDisabled?: boolean
    disabled?: boolean
    ariaLabel?: string
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
    formId?: ButtonHTMLAttributes<HTMLButtonElement>["form"]
    className?: string
}

export function PrimaryButton(props: primaryButtonProps) {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            aria-disabled={props.ariaDisabled}
            aria-label={props.ariaLabel}
            className={`btn btn--primary ${props.className}`.trim() || ""}
            type={props.type || "button"}
            form={props.formId}
        >
            {props.children}
        </button>
    )
}
