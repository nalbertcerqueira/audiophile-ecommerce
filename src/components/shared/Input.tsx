import {
    HTMLInputTypeAttribute,
    FocusEvent,
    forwardRef,
    ForwardedRef,
    ChangeEvent
} from "react"

interface InputProps {
    name: string
    type: HTMLInputTypeAttribute
    disabled?: boolean
    label?: string
    id?: string
    value?: string | number
    autocomplete?: string
    placeholder?: string
    error?: string | boolean
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
            <input
                disabled={props.disabled}
                value={props.value}
                ref={ref}
                onBlur={props.onBlur}
                onChange={props.onChange}
                className={`field__input ${props.error ? "field__input--error" : ""}`.trim()}
                id={props.id}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                autoComplete={props.autocomplete}
            />
            {props.error && <p className="field__error-msg">{props.error}</p>}
        </div>
    )
})
