import { PaymentMethod } from "../../types/types"
import { CreditCardFields } from "./CreditCardFields"
import { RadioInput } from "../RadioInput"
import { BaseCheckoutFieldProps } from "./types"

interface PaymentDetailProps extends BaseCheckoutFieldProps {
    currentPaymentMethod: PaymentMethod
}

export function PaymentFields(props: PaymentDetailProps) {
    const { control, formErrors, fieldsetTitle, currentPaymentMethod, register } = props

    return (
        <fieldset className="checkout-form__payment-details ">
            <legend className="fieldset__title">{fieldsetTitle}</legend>
            <div className="checkout-form__payment-methods">
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
            </div>
            {currentPaymentMethod === "creditCard" && (
                <CreditCardFields control={control} formErrors={formErrors} />
            )}
        </fieldset>
    )
}
