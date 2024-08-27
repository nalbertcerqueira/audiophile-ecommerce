import { Input } from "../../../shared/inputs/Input"
import { BaseCheckoutFieldProps } from "./types"
import { PhoneInput } from "@/components/shared/inputs/PhoneInput"
import "react-international-phone/style.css"

export function BillingDetailFields(props: BaseCheckoutFieldProps) {
    const { fieldsetTitle, formErrors, control, register } = props

    return (
        <fieldset className="checkout-form__billing-details">
            <legend className="fieldset__title">{fieldsetTitle}</legend>
            <Input
                {...register("fullName")}
                error={formErrors.fullName?.message}
                label="Full Name"
                id="fullName"
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
            <PhoneInput
                name="phone"
                placeholder="+1 (999) 999-9999"
                label="Phone Number"
                error={formErrors.phone?.message}
                control={control as any}
            />
        </fieldset>
    )
}
