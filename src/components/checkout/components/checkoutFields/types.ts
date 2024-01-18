import { CheckoutFields } from "../../types/types"
import { Control, UseFormRegister, FieldErrors } from "react-hook-form"

export interface BaseCheckoutFieldProps {
    fieldsetTitle: string
    formErrors: FieldErrors<CheckoutFields>
    control: Control<CheckoutFields>
    register: UseFormRegister<CheckoutFields>
}
