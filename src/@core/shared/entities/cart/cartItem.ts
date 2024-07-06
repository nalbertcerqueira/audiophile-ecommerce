import { Entity } from "../helpers"
import { cartItemZodSchema } from "./utils"

export interface CartProduct {
    readonly productId: string
    readonly slug: string
    name: string
    quantity: number
    price: number
}

//Entidade responsável por representar um item do carrinho de compras
export class CartItem extends Entity<CartProduct> {
    private props: CartProduct
    private itemSchema = cartItemZodSchema

    constructor(props: CartProduct) {
        super()
        const validation = this.validate(props, this.itemSchema)

        if (!validation.success) {
            const firstError = validation.errors[0]
            throw new Error(firstError)
        }

        const { data } = validation
        this.props = { ...data }
    }

    public get productId(): string {
        return this.props.productId
    }

    public get slug(): string {
        return this.props.slug
    }

    public get name(): string {
        return this.props.name
    }

    public get quantity(): number {
        return this.props.quantity
    }

    public get price(): number {
        return this.props.price
    }

    public toJSON(): CartProduct {
        return { ...this.props }
    }
}
