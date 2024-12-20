import { CheckoutOrderProps, Customer, Taxes } from "./checkoutOrder"
import { cartItemZodSchema } from "../cart/utils"
import { schemaFromType, ZodHelper } from "../helpers"
import z from "zod"

export const customerZodSchema = schemaFromType<Customer>()(
    z.object({
        email: ZodHelper.email("Email"),
        fullName: ZodHelper.userName("Full name", 8)
    })
).strict()

export const taxesZodSchema = schemaFromType<Taxes>()(
    z.object({
        vat: ZodHelper.number("Vat tax", 0),
        shipping: ZodHelper.number("Shipping tax", 0)
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
