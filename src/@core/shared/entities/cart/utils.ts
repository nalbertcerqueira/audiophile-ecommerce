import z from "zod"
import { CartProduct, CartProps } from "./cart"
import { schemaFromType } from "../helpers"

export const cartItemZodSchema = schemaFromType<CartProduct>()(
    z.object({
        productId: z.string().min(1),
        name: z.string().min(1).trim(),
        slug: z.string().min(1).trim().toLowerCase(),
        price: z.number().gt(0).finite(),
        quantity: z.number().int().gt(0).finite()
    })
).strict()

export const cartZodSchema = schemaFromType<CartProps>()(
    z.object({
        items: z.array(cartItemZodSchema).min(0)
    })
).strict()
