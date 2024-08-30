import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { ZodSchema, object as zodObject, number as zodNumber } from "zod"

type QuantitySchema = Pick<CartProduct, "quantity">

export const zodItemQuantitySchema: ZodSchema<QuantitySchema> = zodObject({
    quantity: zodNumber().int().gte(0).finite()
}).strict()
