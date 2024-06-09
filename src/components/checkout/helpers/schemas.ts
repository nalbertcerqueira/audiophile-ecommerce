import { nameMessage, nameRegexp } from "@/@core/shared/entities/user/utils"
import { lengthErrorMessage, requiredErrorMessage } from "../../../libs/zod/errors"
import { CheckoutFields } from "../types/types"
import z from "zod"

const checkoutBaseSchema = z.object({
    fullName: createStringSchema("Full Name", { min: 8 }).refine(
        (name) => name.match(nameRegexp),
        { message: `Full Name ${nameMessage}`, path: [""] }
    ),
    email: z
        .string({ required_error: requiredErrorMessage("Email") })
        .trim()
        .email("Invalid email format"),
    phone: z
        .string({ required_error: requiredErrorMessage("Phone") })
        .trim()
        .refine((phone) => phone.split(" ").slice(1).join("").replace(/\D/g, "").length >= 9, {
            message: "Minimum of 9 characters without country code",
            path: [""]
        }),
    zipCode: z
        .string({ required_error: requiredErrorMessage("Zip code") })
        .min(5, lengthErrorMessage("Zip code", "min", 5)),
    address: createStringSchema("Address", { min: 8 }),
    city: createStringSchema("City", { min: 4 }),
    country: createStringSchema("Country", { min: 4 })
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

function createStringSchema(fieldName: string, { min }: { min: number }) {
    return z
        .string({ required_error: requiredErrorMessage(fieldName) })
        .trim()
        .min(min, lengthErrorMessage(fieldName, "min", min))
        .refine((input) => input.replace(/ /g, "").length >= min, {
            message: lengthErrorMessage(fieldName, "min", min),
            path: [""]
        })
}
