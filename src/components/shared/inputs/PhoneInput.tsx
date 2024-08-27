import { PhoneInput as ReactInternationalPhone } from "react-international-phone"
import { Controller, Control } from "react-hook-form"

interface PhoneInputProps {
    label: string
    name: string
    control: Control
    placeholder?: string
    error?: string
}

export function PhoneInput({ name, label, placeholder, error, control }: PhoneInputProps) {
    const labelErrorClassname = error ? "field__label--error" : ""
    const phoneErrorClassname = error ? "react-international-phone--error" : ""

    return (
        <div className="field">
            <div className="field__label-wrapper">
                <label
                    htmlFor="phone"
                    className={`field__label ${labelErrorClassname}`.trim()}
                >
                    {label}
                </label>
            </div>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <ReactInternationalPhone
                        {...field}
                        placeholder={placeholder}
                        className={`${phoneErrorClassname}`.trim()}
                        disableDialCodePrefill={true}
                        onChange={(_, meta) =>
                            field.onChange({
                                currentTarget: { value: meta.inputValue },
                                target: { value: meta.inputValue }
                            })
                        }
                    />
                )}
            />
            {error ? <p className="field__error-msg">{error}</p> : null}
        </div>
    )
}
