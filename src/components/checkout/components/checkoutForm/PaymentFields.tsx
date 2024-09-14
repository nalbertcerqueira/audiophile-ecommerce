import { PaymentMethod } from "../../types/types"
import { CreditCardFields } from "./CreditCardFields"
import { RadioInput } from "../RadioInput"
import { BaseCheckoutFieldProps } from "./types"
import { Fieldset } from "@/components/shared/form/Fieldset"

interface PaymentDetailProps extends BaseCheckoutFieldProps {
    currentPaymentMethod: PaymentMethod
}

export function PaymentFields(props: PaymentDetailProps) {
    const { control, formErrors, fieldsetTitle, currentPaymentMethod, register } = props

    return (
        <>
            <Fieldset title={fieldsetTitle} className="checkout-form__payment-details">
                <RadioInput
                    {...register("paymentMethod")}
                    checked={currentPaymentMethod === "creditCard"}
                    value="creditCard"
                    label="Credit Card"
                    id="credit-card"
                />
                <RadioInput
                    {...register("paymentMethod")}
                    checked={currentPaymentMethod === "cash"}
                    value="cash"
                    label="Cash on Delivery"
                    id="cash"
                />
            </Fieldset>
            {currentPaymentMethod === "creditCard" && (
                <CreditCardFields control={control} formErrors={formErrors} />
            )}
        </>
    )
}
