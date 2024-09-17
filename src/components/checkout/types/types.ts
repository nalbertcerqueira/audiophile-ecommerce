export type PaymentMethod = "creditCard" | "cash"

export interface CheckoutBaseFields {
    fullName: string
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
    expMonth: number
    expYear: number
    cvv: string
}

export type CheckoutFields = CheckoutWithCash | CheckoutWithCreditCard
