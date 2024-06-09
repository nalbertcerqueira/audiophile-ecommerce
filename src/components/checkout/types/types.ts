export type PaymentMethod = "creditCard" | "cash"

export type ExpirationDate = { month: number; year: number }
export interface CheckoutBaseFields {
    fullName: string
    email: string
    phone: string
    address: string
    zipCode: string
    city: string
    country: string
}

export interface CheckoutWithCash extends CheckoutBaseFields {
    paymentMethod: "cash"
}

export interface CheckoutWithCreditCard extends CheckoutBaseFields {
    paymentMethod: "creditCard"
    cardNumber: string
    expDate: ExpirationDate
    cvv: string
}

export type CheckoutFields = CheckoutWithCash | CheckoutWithCreditCard
