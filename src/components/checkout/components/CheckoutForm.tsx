"use client"

import { CheckoutFields, CheckoutWithCreditCard } from "../types/types"
import { Input } from "@/components/checkout/components/Input"
import { CashIcon } from "@/components/shared/icons/CashIcon"
import { checkoutFieldsSchema } from "../helpers/schemas"
import { RadioInput } from "./RadioInput"
import { useForm, FieldErrors, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import {
    maskCreditCardNumber,
    maskCvv,
    maskPhoneNumber,
    maskZipCode,
    handleNumericField,
    maskExpirationMonth,
    maskExpirationYear,
    handleExpirationDate
} from "../helpers/utils"

export function CheckoutForm({ formId }: { formId: string }) {
    const {
        watch,
        control,
        setValue,
        register,
        resetField,
        handleSubmit,
        formState: { errors }
    } = useForm<CheckoutFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(checkoutFieldsSchema)
    })
    const paymentMethod = watch("paymentMethod")

    useEffect(() => setValue("paymentMethod", "cash"), [setValue])
    useEffect(() => {
        if (paymentMethod === "creditCard") {
            resetField("cardNumber")
            resetField("expDate")
            resetField("cvv")
        }
    }, [paymentMethod, resetField])

    function renderCreditCardFields() {
        const creditCardErrors: FieldErrors<CheckoutWithCreditCard> = errors
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
                        className={`checkout__expdate-label ${
                            creditCardErrors.expDate ? "checkout__expdate-label--error" : ""
                        }`}
                        htmlFor="exp-month"
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
                                    error={
                                        expDateError ||
                                        creditCardErrors.expDate?.month?.message
                                    }
                                    onChange={handleExpirationDate(field, "month")}
                                    id="exp-month"
                                    type="tel"
                                    autocomplete="off"
                                    placeholder="MM"
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
                                    error={
                                        !!expDateError ||
                                        creditCardErrors.expDate?.year?.message
                                    }
                                    onChange={handleExpirationDate(field, "year")}
                                    id="exp-year"
                                    type="tel"
                                    autocomplete="off"
                                    placeholder="YY"
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

    function renderCashGuidance() {
        return (
            <div className="checkout__cash-guidance">
                <CashIcon className="checkout__cash-icon" />
                <p className="checkout__cash-info">
                    The &#8216;Cash on Delivery&#8217; option enables you to pay in cash when
                    our delivery courier arrives at your residence. Just make sure your address
                    is correct so that your order will not be cancelled.
                </p>
            </div>
        )
    }

    return (
        <div className="checkout">
            <h2 className="checkout__title">CHECKOUT</h2>
            <form id={formId} className="checkout__form" onSubmit={handleSubmit(() => {})}>
                <fieldset className="checkout__billing-details">
                    <legend className="checkout__group-name">BILLING DETAILS</legend>
                    <Input
                        {...register("name")}
                        error={errors.name?.message}
                        label="Name"
                        id="name"
                        type="text"
                        autocomplete="name"
                        placeholder="Alexei Ward"
                    />
                    <Input
                        {...register("email")}
                        error={errors.email?.message}
                        label="Email Address"
                        id="email"
                        type="text"
                        autocomplete="email"
                        placeholder="alexei@mail.com"
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                value={maskPhoneNumber(field.value || "")}
                                onChange={handleNumericField(field, 12)}
                                error={errors.phone?.message}
                                label="Phone Number"
                                id="phone"
                                type="tel"
                                autocomplete="tel"
                                placeholder="+1 202-555-0136"
                            />
                        )}
                    />
                </fieldset>
                <fieldset className="checkout__shipping-details">
                    <legend className="checkout__group-name">SHIPPING INFO</legend>
                    <Input
                        {...register("address")}
                        error={errors.address?.message}
                        label="Address"
                        id="address"
                        type="text"
                        autocomplete="shipping"
                        placeholder="1137 Williams Avenue"
                    />
                    <Controller
                        name="zipCode"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                value={maskZipCode(field.value || "")}
                                onChange={handleNumericField(field, 8)}
                                error={errors.zipCode?.message}
                                label="ZIP Code"
                                id="zip-code"
                                type="text"
                                autocomplete="postal-code"
                                placeholder="10001"
                            />
                        )}
                    />
                    <Input
                        {...register("city")}
                        error={errors.city?.message}
                        label="City"
                        id="city"
                        type="text"
                        autocomplete="home-city"
                        placeholder="New York"
                    />
                    <Input
                        {...register("country")}
                        error={errors.country?.message}
                        label="Country"
                        id="country"
                        type="text"
                        autocomplete="country-name"
                        placeholder="United States"
                    />
                </fieldset>
                <fieldset className="checkout__payment-details ">
                    <legend className="checkout__group-name">PAYMENT DETAILS</legend>
                    <RadioInput
                        {...register("paymentMethod")}
                        checked={paymentMethod === "creditCard"}
                        value="creditCard"
                        label="Credit Card"
                        id="credit-card"
                    />
                    <RadioInput
                        {...register("paymentMethod")}
                        checked={paymentMethod === "cash"}
                        value="cash"
                        label="Cash on Delivery"
                        id="cash"
                    />
                    {paymentMethod === "creditCard" && renderCreditCardFields()}
                </fieldset>
            </form>
            {paymentMethod === "cash" && renderCashGuidance()}
        </div>
    )
}
