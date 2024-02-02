import { generateCustomZodErrors } from "../helpers"
import { cartItemZodSchema, cartZodSchema } from "./util"
import { EntityValidationResult } from "../protocols"

export interface CartProduct {
    readonly productId: string
    readonly slug: string
    name: string
    quantity: number
    price: number
}

export interface CartProps {
    totalSpent: number
    itemCount: number
    items: CartProduct[]
}

//Entidade responsável por representar o carrinho de compras do usuário
export class Cart {
    private props: CartProps
    public static readonly cartSchema = cartZodSchema
    public static readonly itemSchema = cartItemZodSchema

    public static validateCart(cart: any): EntityValidationResult<CartProps> {
        const validationResult = Cart.cartSchema.safeParse(cart)

        if (!validationResult.success) {
            return {
                success: false,
                errors: generateCustomZodErrors(validationResult.error, 1)
            }
        }

        return { success: true, data: validationResult.data }
    }

    public static empty(): Cart {
        return new Cart({ items: [], itemCount: 0, totalSpent: 0 })
    }

    constructor(props: CartProps) {
        const validationResult = Cart.validateCart(props)

        if (!validationResult.success) {
            const firstError = validationResult.errors[0]
            throw new Error(firstError)
        }

        const { data } = validationResult
        this.props = {
            ...data,
            items: data.items.map((item) => ({ ...item }))
        }
    }

    public toJSON(): CartProps {
        return {
            ...this.props,
            items: this.props.items.map((item) => ({ ...item }))
        }
    }
}
