import {
    HTMLInputTypeAttribute,
    FocusEvent,
    forwardRef,
    ForwardedRef,
    ChangeEvent,
    ReactNode
} from "react"

interface InputProps {
    name: string
    type: HTMLInputTypeAttribute
    ariaLabel?: string
    disabled?: boolean
    label?: string
    id?: string
    value?: string | number
    autocomplete?: string
    placeholder?: string
    error?: string
    className?: string
    children?: ReactNode
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = forwardRef(function Input(
    props: InputProps,
    ref: ForwardedRef<HTMLInputElement>
) {
    function renderLabel() {
        return (
            <div className="field__label-wrapper">
                <label
                    aria-label={props.ariaLabel}
                    htmlFor={props.id}
                    className={`field__label ${
                        props.error ? "field__label--error" : ""
                    }`.trim()}
                >
                    {props.label}
                </label>
            </div>
        )
    }

    return (
        <div className="field">
            {props.label && renderLabel()}
            <div className="field__input-wrapper">
                <input
                    aria-invalid={props.error ? "true" : "false"}
                    aria-describedby={`${props.name}-error`}
                    disabled={props.disabled}
                    ref={ref}
                    id={props.id}
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    onBlur={props.onBlur}
                    onChange={props.onChange}
                    className={`field__input ${props.className || ""} ${props.error ? "field__input--error" : ""}`.trim()}
                    spellCheck="false"
                    placeholder={props.placeholder}
                    autoComplete={props.autocomplete}
                />
                {props.children}
            </div>
            {props.error && (
                <p
                    id={`${props.name}-error`}
                    aria-live="assertive"
                    className="field__error-msg"
                >
                    {props.error}
                </p>
            )}
        </div>
    )
})
