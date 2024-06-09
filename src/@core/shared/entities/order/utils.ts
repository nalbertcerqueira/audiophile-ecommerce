import { emailZodSchema, nameLengthMessage, nameMessage, nameRegexp } from "../user/utils"
import { CheckoutOrderProps, Customer, Taxes } from "./checkoutOrder"
import { cartZodSchema } from "../cart/utils"
import { schemaFromType } from "../helpers"
import z from "zod"

export const customerZodSchema = schemaFromType<Customer>()(
    z.object({
        email: emailZodSchema,
        fullName: z
            .string()
            .trim()
            .min(8, nameLengthMessage)
            .refine((name) => name.match(nameRegexp), { message: nameMessage, path: [""] })
            .refine((input) => input.replace(/ /g, "").length >= 4, {
                message: nameLengthMessage,
                path: [""]
            })
    })
).strict()

export const taxesZodSchema = schemaFromType<Taxes>()(
    z.object({
        vat: z.number().gt(0),
        shipping: z.number().gt(0)
    })
)

export const checkoutOrderZodSchema = schemaFromType<CheckoutOrderProps>()(
    z.object({
        orderId: z.string().min(1),
        customer: customerZodSchema,
        taxes: taxesZodSchema,
        cart: cartZodSchema
    })
).strict()
