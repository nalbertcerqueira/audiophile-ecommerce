import { emailZodSchema, userNameZodSchema } from "../user/utils"
import { CheckoutOrderProps, Customer, Taxes } from "./checkoutOrder"
import { cartZodSchema } from "../cart/utils"
import { schemaFromType } from "../helpers"
import z from "zod"

export const customerZodSchema = schemaFromType<Customer>()(
    z.object({
        name: userNameZodSchema,
        email: emailZodSchema
    })
).strict()

export const taxesZodSchema = schemaFromType<Taxes>()(
    z.object({
        vat: z.number().gt(0),
        shipping: z.number().gt(0)
    })
)

export const zodCheckoutOrderSchema = schemaFromType<CheckoutOrderProps>()(
    z.object({
        orderId: z.string().min(1),
        customer: customerZodSchema,
        taxes: taxesZodSchema,
        cart: cartZodSchema
    })
).strict()
