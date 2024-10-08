import { Input } from "../../../shared/inputs/Input"
import { handleExpirationDate } from "../../helpers/utils"
import { CheckoutWithCreditCard } from "../../types/types"
import { handleFormNumericField } from "@/utils/helpers"
import { BaseCheckoutFieldProps } from "./types"
import { Controller, FieldErrors } from "react-hook-form"
import {
    maskCvv,
    maskExpirationMonth,
    maskExpirationYear,
    maskCreditCardNumber
} from "@/utils/masks"

type CreditCardDetailProps = Pick<BaseCheckoutFieldProps, "control" | "formErrors">

export function CreditCardFields(props: CreditCardDetailProps) {
    const { control, formErrors } = props
    const creditCardErrors: FieldErrors<CheckoutWithCreditCard> = formErrors
    const expDateError = creditCardErrors.expMonth || creditCardErrors.expYear

    return (
        <div className="checkout-form__cc-fields">
            <Controller
                name="cardNumber"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        value={maskCreditCardNumber(field.value || "")}
                        onChange={handleFormNumericField(field, 16)}
                        error={creditCardErrors.cardNumber?.message}
                        label="Card Number"
                        id="card-number"
                        type="tel"
                        autocomplete="off"
                        placeholder="0000 0000 0000 0000"
                    />
                )}
            />
            <div>
                <label
                    htmlFor="exp-month"
                    className={`checkout-form__expdate-label ${
                        expDateError ? "checkout-form__expdate-label--error" : ""
                    }`}
                >
                    Expiration Date
                </label>
                <div className="checkout-form__expdate">
                    <Controller
                        name="expMonth"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                name="expMonth"
                                value={maskExpirationMonth(`${field.value}`)}
                                onChange={handleExpirationDate(field, "month")}
                                id="exp-month"
                                type="tel"
                                autocomplete="off"
                                placeholder="MM"
                                error={creditCardErrors.expMonth?.message}
                            />
                        )}
                    />
                    <Controller
                        name="expYear"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                name="expYear"
                                value={maskExpirationYear(`${field.value}`)}
                                onChange={handleExpirationDate(field, "year")}
                                id="exp-year"
                                type="tel"
                                autocomplete="off"
                                placeholder="YY"
                                error={creditCardErrors.expYear?.message}
                            />
                        )}
                    />
                </div>
            </div>
            <Controller
                name="cvv"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        value={maskCvv(field.value || "")}
                        onChange={handleFormNumericField(field, 3)}
                        error={creditCardErrors.cvv?.message}
                        label="CVV"
                        ariaLabel="CVV code"
                        id="cvv"
                        type="tel"
                        autocomplete="off"
                        placeholder="xxx"
                    />
                )}
            />
        </div>
    )
}
