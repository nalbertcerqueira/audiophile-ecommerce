import { Input } from "../../../shared/Input"
import { Controller, FieldErrors } from "react-hook-form"
import { CheckoutWithCreditCard } from "../../types/types"
import {
    maskCvv,
    maskExpirationMonth,
    maskExpirationYear,
    maskCreditCardNumber,
    handleExpirationDate,
    handleNumericField
} from "../../helpers/utils"
import { BaseCheckoutFieldProps } from "./types"

type CreditCardDetailProps = Pick<BaseCheckoutFieldProps, "control" | "formErrors">

export function CreditCardFields(props: CreditCardDetailProps) {
    const { control, formErrors } = props
    const creditCardErrors: FieldErrors<CheckoutWithCreditCard> = formErrors
    const expDateError = creditCardErrors.expDate?.root?.message

    return (
        <div className="checkout__cc-fields">
            <Controller
                name="cardNumber"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        value={maskCreditCardNumber(field.value || "")}
                        onChange={handleNumericField(field, 16)}
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
                    className={`checkout__expdate-label ${
                        creditCardErrors.expDate ? "checkout__expdate-label--error" : ""
                    }`}
                >
                    Expiration Date
                </label>
                <div className="checkout__expdate">
                    <Controller
                        name="expDate.month"
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
                                error={
                                    expDateError || creditCardErrors.expDate?.month?.message
                                }
                            />
                        )}
                    />
                    <Controller
                        name="expDate.year"
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
                                error={
                                    !!expDateError || creditCardErrors.expDate?.year?.message
                                }
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
                        onChange={handleNumericField(field, 3)}
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
