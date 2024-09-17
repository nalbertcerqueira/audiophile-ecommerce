import { nameMessage, nameRegexp, phoneZodSchema } from "@/@core/shared/entities/user/utils"
import { addressZodSchema } from "@/@core/shared/entities/address/utils"
import { CheckoutFields } from "../types/types"
import z from "zod"
import { createZodStringSchema } from "@/@core/shared/entities/helpers"

const cashPaymentSchema = z.object({
    paymentMethod: z.literal("cash")
})

const checkoutBaseSchema = z
    .object({
        phone: phoneZodSchema,
        fullName: createZodStringSchema(8).refine((name) => name.match(nameRegexp), {
            message: nameMessage
        })
    })
    .merge(addressZodSchema)
    .strict()

const creditCardPaymentSchema = z.object({
    paymentMethod: z.literal("creditCard"),
    cvv: z.string({ required_error: "is required" }).length(3, "is invalid"),
    cardNumber: z
        .string({ required_error: "is required" })
        .length(16, "must be 16 characters long"),
    expMonth: z
        .number({ required_error: "is required" })
        .min(1, "is invalid")
        .max(12, "is invalid"),
    expYear: z
        .number({ required_error: "is required" })
        .gte(parseInt(`${new Date().getFullYear()}`.slice(-2)), "is invalid")
})

export const checkoutFieldsSchema: z.ZodType<CheckoutFields> = z.discriminatedUnion(
    "paymentMethod",
    [
        checkoutBaseSchema.merge(cashPaymentSchema).strict(),
        checkoutBaseSchema.merge(creditCardPaymentSchema).strict()
    ]
)
