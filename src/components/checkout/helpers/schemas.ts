import { lengthErrorMessage, requiredErrorMessage } from "./errors"
import { CheckoutFields } from "../types/types"
import z from "zod"

const checkoutBaseSchema = z.object({
    name: z.string().min(6, lengthErrorMessage("Name", "min", 6)),
    email: z.string().email("Invalid email formart"),
    phone: z.string().min(10, lengthErrorMessage("Phone", "min", 10)),
    address: z.string().min(8, lengthErrorMessage("Address", "min", 8)),
    zipCode: z.string().min(5, lengthErrorMessage("Zip code", "min", 5)),
    city: z.string().min(4, lengthErrorMessage("City", "min", 4)),
    country: z.string().min(4, lengthErrorMessage("Country", "min", 4))
})

const cashPaymentSchema = z.object({
    paymentMethod: z.literal("cash")
})

const creditCardPaymentSchema = z.object({
    paymentMethod: z.literal("creditCard"),
    cvv: z.string({ required_error: requiredErrorMessage("CVV") }).length(3, "Invalid CVV"),
    cardNumber: z
        .string({ required_error: requiredErrorMessage("Card") })
        .length(16, "Card number must be 16 characters long"),
    expDate: z.object(
        {
            month: z
                .number({ required_error: requiredErrorMessage("Month") })
                .min(1, "Invalid Exp. month")
                .max(12, "Invalid Exp. month"),
            year: z
                .number({ required_error: requiredErrorMessage("Year") })
                .gte(parseInt(`${new Date().getFullYear()}`.slice(-2)), "Invalid Exp. year")
        },
        { required_error: requiredErrorMessage("Exp. date") }
    )
})

export const checkoutFieldsSchema: z.ZodType<CheckoutFields> = z.discriminatedUnion(
    "paymentMethod",
    [
        checkoutBaseSchema.merge(cashPaymentSchema),
        checkoutBaseSchema.merge(creditCardPaymentSchema)
    ]
)
