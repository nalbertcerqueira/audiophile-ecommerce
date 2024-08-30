import { nameMessage, nameRegexp } from "@/@core/shared/entities/user/utils"
import { createStringSchema } from "../../../libs/zod/utils"
import { lengthErrorMessage } from "../../../libs/zod/errors"
import { CheckoutFields } from "../types/types"
import z from "zod"

const cashPaymentSchema = z.object({
    paymentMethod: z.literal("cash")
})

const creditCartExpDateSchema = z.object(
    {
        month: z
            .number({ required_error: "Exp. month is required" })
            .min(1, "Invalid Exp. month")
            .max(12, "Invalid Exp. month"),
        year: z
            .number({ required_error: "Exp. year is required" })
            .gte(parseInt(`${new Date().getFullYear()}`.slice(-2)), "Invalid Exp. year")
    },
    { required_error: "Exp. date is required" }
)

const checkoutBaseSchema = z.object({
    fullName: createStringSchema("Full Name", { min: 8 }).refine(
        (name) => name.match(nameRegexp),
        { message: `Full Name ${nameMessage}`, path: [""] }
    ),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email("Invalid email format"),
    phone: createStringSchema("Phone", { min: 12 }),
    zipCode: z
        .string({ required_error: "Zip code is required" })
        .min(5, lengthErrorMessage("Zip code", "min", 5)),
    address: createStringSchema("Address", { min: 8 }),
    city: createStringSchema("City", { min: 4 }),
    country: createStringSchema("Country", { min: 4 })
})

const creditCardPaymentSchema = z.object({
    paymentMethod: z.literal("creditCard"),
    cvv: z.string({ required_error: "CVV is required" }).length(3, "Invalid CVV"),
    cardNumber: z
        .string({ required_error: "Card number is required" })
        .length(16, "Card number must be 16 characters long"),
    expDate: creditCartExpDateSchema
})

export const checkoutFieldsSchema: z.ZodType<CheckoutFields> = z.discriminatedUnion(
    "paymentMethod",
    [
        checkoutBaseSchema.merge(cashPaymentSchema).strict(),
        checkoutBaseSchema.merge(creditCardPaymentSchema).strict()
    ]
)
