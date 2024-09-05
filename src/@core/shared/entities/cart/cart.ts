import { EntityValidationResult } from "../protocols"
import { CartItem, CartProduct } from "./cartItem"
import { Entity } from "../helpers"

export interface CartProps {
    items: CartProduct[]
}

//Entidade responsável por representar o carrinho de compras do usuário
export class Cart extends Entity<CartProps> {
    private props: { items: CartItem[] }

    public static empty(): Cart {
        return new Cart({ items: [] })
    }

    constructor(props: { items: CartItem[] }) {
        super()
        const validation = this.validate(props)

        if (!validation.success) {
            const firstError = validation.errors[0]
            throw new Error(firstError)
        }

        this.props = { items: validation.data.items }
    }

    public addItem(id: string, qty: number): CartItem | null {
        const foundItem = this.props.items.find(({ productId }) => productId === id)

        if (!foundItem) {
            return null
        }

        foundItem.quantity += qty
        return foundItem
    }

    public removeItem(id: string, qty: number): CartItem | null {
        const foundItem = this.props.items.find(({ productId }) => productId === id)

        if (!foundItem) {
            throw new Error(`Item with id '${id}' not found`)
        }

        if (foundItem.quantity - qty <= 0) {
            this.props.items = this.props.items.filter((item) => item.productId != id)
            return null
        }

        foundItem.quantity -= qty
        return foundItem
    }

    public toJSON(): CartProps {
        return {
            items: this.props.items.map((item) => item.toJSON())
        }
    }

    public calculateTotalSpent(): number {
        return this.props.items.reduce((acc, item) => (acc += item.quantity * item.price), 0)
    }

    public countItems(): number {
        return this.props.items.reduce((acc, item) => (acc += item.quantity), 0)
    }

    protected validate(props: any): EntityValidationResult<{ items: CartItem[] }> {
        const keys = Object.keys(props) as Array<keyof CartProps>

        for (const key of keys) {
            if (key !== "items") {
                return { success: false, errors: [`Unknown property: ${key}`] }
            }
        }

        if (!Array.isArray(props.items)) {
            return { success: false, errors: ["Items must be an array"] }
        }

        return { success: true, data: props }
    }
}

export function createCart(props: CartProps): Cart {
    const items = props.items.map((item) => new CartItem(item))
    return new Cart({ items })
}
