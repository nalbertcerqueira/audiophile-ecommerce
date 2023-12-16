import z from "zod"
import { CartProduct, CartProps } from "./cart"
import { schemaFromType } from "../helpers"

export const cartItemZodSchema = schemaFromType<CartProduct>()(
    z.object({
        productId: z.string().min(1),
        name: z.string().min(3).trim(),
        slug: z.string().min(5).trim().toLowerCase(),
        price: z.number().gt(0).finite(),
        quantity: z.number().int().gt(0).finite()
    })
).strict()

export const cartZodSchema = schemaFromType<CartProps>()(
    z.object({
        userId: z.string().min(1),
        userType: z.enum(["authenticated", "guest"]),
        totalSpent: z.number().gte(0).finite(),
        itemCount: z.number().int().gte(0).finite(),
        items: z.array(cartItemZodSchema).min(0)
    })
).strict()
