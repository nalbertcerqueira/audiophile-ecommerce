import { Input } from "../../../shared/Input"
import { Controller } from "react-hook-form"
import { BaseCheckoutFieldProps } from "./types"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"

export function BillingDetailFields(props: BaseCheckoutFieldProps) {
    const { fieldsetTitle, formErrors, control, register } = props
    const labelErrorClassname = formErrors.phone?.message ? "field__label--error" : ""
    const phoneErrorClassname = formErrors.phone?.message
        ? "react-international-phone--error"
        : ""

    return (
        <fieldset className="checkout__billing-details">
            <legend className="checkout__group-name">{fieldsetTitle}</legend>
            <Input
                {...register("name")}
                error={formErrors.name?.message}
                label="Name"
                id="name"
                type="text"
                autocomplete="name"
                placeholder="Alexei Ward"
            />
            <Input
                {...register("email")}
                error={formErrors.email?.message}
                label="Email Address"
                id="email"
                type="text"
                autocomplete="email"
                placeholder="alexei@mail.com"
            />
            <div className="field">
                <div className="field__label-wrapper">
                    <label
                        htmlFor="phone"
                        className={`field__label ${labelErrorClassname}`.trim()}
                    >
                        Phone Number
                    </label>
                </div>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <PhoneInput
                            {...field}
                            placeholder="+1 (999) 999-9999"
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

                {formErrors.phone && (
                    <p className="field__error-msg">{formErrors.phone?.message}</p>
                )}
            </div>
        </fieldset>
    )
}
