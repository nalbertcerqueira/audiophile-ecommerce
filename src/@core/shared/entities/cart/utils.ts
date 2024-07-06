import z from "zod"
import { CartProduct } from "./cartItem"
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
