import { emailZodSchema, nameMessage, nameRegexp } from "../user/utils"
import { CheckoutOrderProps, Customer, Taxes } from "./checkoutOrder"
import { cartItemZodSchema } from "../cart/utils"
import { createZodStringSchema, schemaFromType } from "../helpers"
import z from "zod"

export const customerZodSchema = schemaFromType<Customer>()(
    z.object({
        email: emailZodSchema,
        fullName: createZodStringSchema(8).refine((name) => name.match(nameRegexp), {
            message: nameMessage
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
        items: z.array(cartItemZodSchema).min(1),
        taxes: taxesZodSchema
    })
).strict()
