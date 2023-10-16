"use client"

import { CashIcon } from "@/components/shared/icons/CashIcon"
import { Input } from "@/components/checkout/components/Input"
import { RadioInput } from "./RadioInput"
import { FormEvent, useState, useEffect } from "react"

type PaymentMethod = "creditCard" | "cash" | null

interface CheckoutFormProps {
    formId: string
}

export function CheckoutForm({ formId }: CheckoutFormProps) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)

    useEffect(() => setPaymentMethod("creditCard"), [])

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    function renderCreditCardFields() {
        return (
            <div className="checkout__cc-fields">
                <Input
                    label="Card Number"
                    name="cardNumber"
                    id="card-number"
                    type="text"
                    autocomplete="off"
                    placeholder="XXXX XXXX XXXX XXXX"
                />
                <Input
                    label="Expiration Date"
                    name="expDate"
                    id="exp-date"
                    type="text"
                    autocomplete="off"
                    placeholder="MM/YY"
                />
                <Input
                    label="CVV"
                    name="cvv"
                    id="cvv"
                    type="number"
                    autocomplete="off"
                    placeholder="xxx"
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
            <form id={formId} onSubmit={handleFormSubmit} className="checkout__form">
                <fieldset className="checkout__billing-details">
                    <legend className="checkout__group-name">BILLING DETAILS</legend>
                    <Input
                        label="Name"
                        name="name"
                        id="name"
                        type="text"
                        autocomplete="name"
                        placeholder="Alexei Ward"
                    />
                    <Input
                        label="Email Address"
                        name="email"
                        id="email"
                        type="text"
                        autocomplete="email"
                        placeholder="alexei@mail.com"
                    />
                    <Input
                        label="Phone Number"
                        name="phone"
                        id="phone"
                        type="tel"
                        autocomplete="tel"
                        placeholder="+1 202-555-0136"
                    />
                </fieldset>
                <fieldset className="checkout__shipping-details">
                    <legend className="checkout__group-name">SHIPPING INFO</legend>
                    <Input
                        label="Address"
                        name="address"
                        id="address"
                        type="text"
                        autocomplete="shipping"
                        placeholder="1137 Williams Avenue"
                    />
                    <Input
                        label="ZIP Code"
                        name="zipCode"
                        id="zip-code"
                        type="text"
                        autocomplete="postal-code"
                        placeholder="10001"
                    />
                    <Input
                        label="City"
                        name="city"
                        id="city"
                        type="text"
                        autocomplete="home-city"
                        placeholder="New York"
                    />
                    <Input
                        label="Country"
                        name="country"
                        id="country"
                        type="text"
                        autocomplete="country-name"
                        placeholder="United States"
                    />
                </fieldset>
                <fieldset className="checkout__payment-details ">
                    <legend className="checkout__group-name">PAYMENT DETAILS</legend>
                    <RadioInput
                        checked={paymentMethod === "creditCard"}
                        onChange={() => setPaymentMethod("creditCard")}
                        value="creditCard"
                        label="Credit Card"
                        name="paymentMethod"
                        id="credit-card"
                    />
                    <RadioInput
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        value="cash"
                        label="Cash on Delivery"
                        name="paymentMethod"
                        id="cash"
                    />
                    {paymentMethod === "creditCard" && renderCreditCardFields()}
                </fieldset>
            </form>
            {paymentMethod === "cash" && renderCashGuidance()}
        </div>
    )
}
