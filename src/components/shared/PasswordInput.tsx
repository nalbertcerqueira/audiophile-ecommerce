"use client"

import { FocusEvent, forwardRef, ForwardedRef, ChangeEvent, useState } from "react"
import { ClosedEyeIcon, OpenEyeIcon } from "./icons/EyeIcons"

interface InputProps {
    name: string
    disabled?: boolean
    label?: string
    id?: string
    value?: string | number
    autocomplete?: string
    error?: string | boolean
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PasswordInput = forwardRef(function PasswordInput(
    props: InputProps,
    ref: ForwardedRef<HTMLInputElement>
) {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    function renderLabel() {
        return (
            <div className="password-field__label-wrapper">
                <label
                    htmlFor={props.id}
                    className={`password-field__label ${
                        props.error ? "password-field__label--error" : ""
                    }`.trim()}
                >
                    {props.label}
                </label>
            </div>
        )
    }

    return (
        <div className="password-field">
            {props.label && renderLabel()}
            <div className="password-field__input-wrapper">
                <input
                    aria-invalid={props.error ? "true" : "false"}
                    aria-describedby={`${props.name}-error`}
                    ref={ref}
                    disabled={props.disabled}
                    value={props.value}
                    onBlur={props.onBlur}
                    onChange={props.onChange}
                    className={`password-field__input ${props.error ? "password-field__input--error" : ""}`.trim()}
                    id={props.id}
                    type={isVisible ? "text" : "password"}
                    name={props.name}
                    placeholder={isVisible ? "" : "* * * * * * * * * *"}
                    autoComplete={props.autocomplete}
                />
                <button
                    aria-label="hide, or reveal password"
                    onClick={() => setIsVisible((prevState) => !prevState)}
                    type="button"
                    className="password-field__toggle-btn"
                >
                    {isVisible ? (
                        <ClosedEyeIcon className="password-field__icon" />
                    ) : (
                        <OpenEyeIcon className="password-field__icon" />
                    )}
                </button>
            </div>
            {props.error && (
                <p
                    id={`${props.name}-error`}
                    aria-live="assertive"
                    className="password-field__error-msg"
                >
                    {props.error}
                </p>
            )}
        </div>
    )
})
