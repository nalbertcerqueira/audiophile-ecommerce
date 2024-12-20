import { addressZodSchema } from "@/@core/shared/entities/address/utils"
import { CheckoutFields } from "../types/types"
import { ZodHelper } from "@/@core/shared/entities/helpers"
import z from "zod"

const cashPaymentSchema = z.object({
    paymentMethod: z.literal("cash")
})

const checkoutBaseSchema = z
    .object({
        phone: ZodHelper.phone("Phone number"),
        fullName: ZodHelper.userName("Full name", 8)
    })
    .merge(addressZodSchema)
    .strict()

const creditCardPaymentSchema = z.object({
    paymentMethod: z.literal("creditCard"),
    cvv: z.string({ required_error: "CVV code is required" }).length(3, "CVV code is invalid"),
    cardNumber: z
        .string({ required_error: "Card number is required" })
        .length(16, "Card number must be 16 characters long"),
    expMonth: z
        .number({ required_error: "Exp. month is required" })
        .min(1, "Exp. month is invalid")
        .max(12, "Exp. month is invalid"),
    expYear: z
        .number({ required_error: "Exp. year is required" })
        .gte(parseInt(`${new Date().getFullYear()}`.slice(-2)), "Exp. year is invalid")
})

export const checkoutFieldsSchema: z.ZodType<CheckoutFields> = z.discriminatedUnion(
    "paymentMethod",
    [
        checkoutBaseSchema.merge(cashPaymentSchema).strict(),
        checkoutBaseSchema.merge(creditCardPaymentSchema).strict()
    ]
)
