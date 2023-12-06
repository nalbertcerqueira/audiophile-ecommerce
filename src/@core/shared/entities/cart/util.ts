import z from "zod"
import { CartProduct } from "./cart"
import { schemaFromType } from "../helpers"

export const cartItemZodSchema = schemaFromType<CartProduct>()(
    z.object({
        productId: z.string().min(1),
        name: z.string().min(3).trim(),
        slug: z.string().min(3).trim().toLowerCase(),
        price: z.number().gt(0).finite(),
        quantity: z.number().gt(0).finite().int()
    })
).strict()
