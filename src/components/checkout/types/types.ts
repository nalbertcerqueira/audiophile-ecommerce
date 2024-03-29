export type PaymentMethod = "creditCard" | "cash"

export type ExpirationDate = { month: number; year: number }

export type CheckoutFields = CheckoutWithCash | CheckoutWithCreditCard

export interface CheckoutWithCash extends CheckoutBaseFields {
    paymentMethod: "cash"
}

export interface CheckoutWithCreditCard extends CheckoutBaseFields {
    paymentMethod: "creditCard"
    cardNumber: string
    expDate: ExpirationDate
    cvv: string
}

export interface CheckoutBaseFields {
    name: string
    email: string
    phone: string
    address: string
    zipCode: string
    city: string
    country: string
}
