import { Entity } from "../helpers"
import { cartZodSchema } from "./utils"

export interface CartProduct {
    readonly productId: string
    readonly slug: string
    name: string
    quantity: number
    price: number
}

export interface CartProps {
    items: CartProduct[]
}

//Entidade responsável por representar o carrinho de compras do usuário
export class Cart extends Entity<CartProps> {
    private props: CartProps
    private cartSchema = cartZodSchema

    public static empty(): Cart {
        return new Cart({ items: [] })
    }

    constructor(props: CartProps) {
        super()
        const validation = this.validate(props, this.cartSchema)

        if (!validation.success) {
            const firstError = validation.errors[0]
            throw new Error(firstError)
        }

        const { data } = validation
        this.props = {
            items: data.items.map((item) => ({ ...item }))
        }
    }

    public toJSON(): CartProps {
        return {
            items: this.props.items.map((item) => ({ ...item }))
        }
    }

    public calculateTotalSpent(): number {
        return this.props.items.reduce((acc, item) => (acc += item.quantity * item.price), 0)
    }

    public countItems(): number {
        return this.props.items.reduce((acc, item) => (acc += item.quantity), 0)
    }
}
