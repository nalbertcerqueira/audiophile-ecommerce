import { lengthErrorMessage, requiredErrorMessage } from "../../../libs/zod/errors"
import { CheckoutFields } from "../types/types"
import z from "zod"

const checkoutBaseSchema = z.object({
    name: z
        .string({ required_error: requiredErrorMessage("Name") })
        .min(6, lengthErrorMessage("Name", "min", 6)),
    email: z
        .string({ required_error: requiredErrorMessage("Email") })
        .email("Invalid email formart"),
    phone: z
        .string({ required_error: requiredErrorMessage("Phone") })
        .refine((phone) => phone.split(" ").slice(1).join("").replace(/\D/g, "").length >= 9, {
            message: "Minimum of 9 characters without country code",
            path: [""]
        }),
    address: z
        .string({ required_error: requiredErrorMessage("Address") })
        .min(8, lengthErrorMessage("Address", "min", 8)),
    zipCode: z
        .string({ required_error: requiredErrorMessage("Zip code") })
        .min(5, lengthErrorMessage("Zip code", "min", 5)),
    city: z
        .string({ required_error: requiredErrorMessage("City") })
        .min(4, lengthErrorMessage("City", "min", 4)),
    country: z
        .string({ required_error: requiredErrorMessage("Country") })
        .min(4, lengthErrorMessage("Country", "min", 4))
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
        checkoutBaseSchema.merge(cashPaymentSchema).strict(),
        checkoutBaseSchema.merge(creditCardPaymentSchema).strict()
    ]
)
