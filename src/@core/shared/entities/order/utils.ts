import { z } from "zod"
import { schemaFromType } from "../helpers"
import { CheckoutOrderProps, Costumer } from "./checkoutOrder"
import { cartItemZodSchema } from "../cart/util"
import { emailZodSchema, userNameZodSchema } from "../user/utils"

export const zodCostumerSchema = schemaFromType<Costumer>()(
    z.object({
        name: userNameZodSchema,
        email: emailZodSchema
    })
).strict()

export const zodCheckoutOrderSchema = schemaFromType<CheckoutOrderProps>()(
    z.object({
        orderId: z.string().min(1),
        costumer: zodCostumerSchema,
        cartItems: z.array(cartItemZodSchema).min(1),
        totalSpent: z.number().gt(0).finite()
    })
).strict()
