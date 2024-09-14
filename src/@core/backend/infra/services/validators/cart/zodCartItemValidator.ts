import { cartItemZodSchema } from "@/@core/shared/entities/cart/utils"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { ZodSchema } from "zod"

type CartItemRef = Pick<CartProduct, "productId" | "quantity">

export const zodCartItemSchema: ZodSchema<CartItemRef> = cartItemZodSchema.pick({
    productId: true,
    quantity: true
})
