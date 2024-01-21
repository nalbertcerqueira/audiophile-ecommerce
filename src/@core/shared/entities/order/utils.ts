import { emailZodSchema, userNameZodSchema } from "../user/utils"
import { CheckoutOrderProps, Costumer } from "./checkoutOrder"
import { cartItemZodSchema } from "../cart/util"
import { schemaFromType } from "../helpers"
import z from "zod"

export const zodCostumerSchema = schemaFromType<Costumer>()(
    z.object({
        name: userNameZodSchema,
        email: emailZodSchema
    })
).strict()

export const zodCheckoutOrderSchema = schemaFromType<CheckoutOrderProps>()(
    z.object({
        orderId: z.string().min(1),
        costumer: zodCostumerSchema.nullable(),
        cartItems: z.array(cartItemZodSchema).min(1)
    })
).strict()
