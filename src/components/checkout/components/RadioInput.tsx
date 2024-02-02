"use client"

import { FocusEvent, ChangeEvent, forwardRef, ForwardedRef } from "react"

interface RadioInputProps {
    label: string
    name: string
    value?: string
    id?: string
    checked?: boolean
    onChange?: (e: FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const RadioInput = forwardRef(function RadioInput(
    props: RadioInputProps,
    ref: ForwardedRef<HTMLInputElement>
) {
    return (
        <div className="radio-field">
            <label
                htmlFor={props.id}
                className={`radio-field__label ${
                    props.checked ? "radio-field__label--checked" : ""
                }`.trim()}
            >
                <input
                    tabIndex={0}
                    ref={ref}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    className="radio-field__input"
                    value={props.value}
                    checked={props.checked}
                    type="radio"
                    name={props.name}
                    id={props.id}
                />
                {props.label}
            </label>
        </div>
    )
})
