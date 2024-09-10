"use client"

import { Fieldset } from "@/components/shared/form/Fieldset"
import { Input } from "../../../shared/inputs/Input"
import { BaseCheckoutFieldProps } from "./types"
import { PhoneInput } from "@/components/shared/inputs/PhoneInput"
import { useAppSelector } from "@/libs/redux/hooks"
import { selectUserProfile } from "@/store/user"
import "react-international-phone/style.css"

export function BillingDetailFields(props: BaseCheckoutFieldProps) {
    const { fieldsetTitle, formErrors, control, register } = props
    const profile = useAppSelector(selectUserProfile)
    const email = (profile.type !== "guest" && profile.email) || ""

    return (
        <Fieldset title={fieldsetTitle} className="checkout-form__billing-details">
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
                disabled={true}
                value={email}
                name="email"
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
                control={control}
            />
        </Fieldset>
    )
}
