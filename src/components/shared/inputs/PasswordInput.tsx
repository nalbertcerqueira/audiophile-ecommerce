"use client"

import { FocusEvent, forwardRef, ForwardedRef, ChangeEvent, useState } from "react"
import { ClosedEyeIcon, OpenEyeIcon } from "../icons/EyeIcons"
import { Input } from "./Input"

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

    return (
        <Input
            className="field__input--password"
            name={props.name}
            id={props.id}
            label={props.label}
            type={isVisible ? "text" : "password"}
            value={props.value}
            autocomplete={props.autocomplete}
            placeholder={isVisible ? "" : "* * * * * * * * * *"}
            error={props.error}
            disabled={props.disabled}
            onBlur={props.onBlur}
            onChange={props.onChange}
            ref={ref}
        >
            <button
                aria-label="hide, or reveal password"
                onClick={() => setIsVisible((prevState) => !prevState)}
                type="button"
                className="field__action-btn"
            >
                {isVisible ? (
                    <OpenEyeIcon className="field__input-icon" />
                ) : (
                    <ClosedEyeIcon className="field__input-icon" />
                )}
            </button>
        </Input>
    )
})
