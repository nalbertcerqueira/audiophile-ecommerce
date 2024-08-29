import { PhoneInput as ReactInternationalPhone } from "react-international-phone"
import { Controller, Control, Path } from "react-hook-form"

interface PhoneInputProps<Fields extends Record<string, any>> {
    label: string
    name: Path<Fields>
    control: Control<Fields, any>
    placeholder?: string
    error?: string
}

export function PhoneInput<Fields extends Record<string, any>>(
    props: PhoneInputProps<Fields>
) {
    const { name, label, placeholder, error, control } = props
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
                        onChange={(_, meta) => {
                            const newValue = meta.inputValue.replace(/\D/g, "")
                            return field.onChange({
                                currentTarget: { value: newValue },
                                target: { value: newValue }
                            })
                        }}
                    />
                )}
            />
            {error ? <p className="field__error-msg">{error}</p> : null}
        </div>
    )
}
