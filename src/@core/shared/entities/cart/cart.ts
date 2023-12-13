import { cartItemZodSchema } from "./util"

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface CartProduct {
    readonly productId: string
    readonly slug: string
    name: string
    quantity: number
    price: number
}

export type UserType = "authenticated" | "guest"

export interface CartProps {
    userId: string
    totalSpent: number
    itemCount: number
    items: CartProduct[]
}

export class Cart {
    private props: CartProps
    private static readonly itemSchema = cartItemZodSchema

    public static validateItems(items: any[]): CartProduct[] {
        const validItems = items.map((item) => {
            const itemValidation = this.itemSchema.safeParse(item)
            return itemValidation.success ? itemValidation.data : null
        })
        return validItems.filter((item) => item !== null) as CartProduct[]
    }

    public static empty(userId?: string): Cart {
        return new Cart({ userId, items: [], itemCount: 0, totalSpent: 0 })
    }

    constructor(props: Optional<CartProps, "userId">) {
        const { itemCount, totalSpent, items, userId } = props
        const validItems = Cart.validateItems(items)
        this.props = { itemCount, totalSpent, items: validItems, userId: userId || "0" }
    }

    public removeItem(itemId: string, quantity: number): void {
        const foundItem = this.props.items.find((item) => item.productId === itemId)
        if (foundItem) {
            foundItem.quantity -= quantity

            if (foundItem.quantity <= 0) {
                this.props.items = this.props.items.filter((item) => item.productId !== itemId)
            }
        }
    }

    public updateTotalAndCount(): void {
        this.props.itemCount = this.props.items.reduce(
            (acc, item) => (acc += item.quantity),
            0
        )
        this.props.totalSpent = this.props.items.reduce(
            (acc, item) => (acc += item.price * item.quantity),
            0
        )
    }

    public toJSON(): CartProps {
        return this.props
    }

    public addItem(itemId: string, quantity: number): boolean
    public addItem(itemToAdd: CartProduct): void
    public addItem(itemOrId: CartProduct | string, quantity?: number): boolean | void {
        const foundIndex = this.props.items.findIndex((item) => {
            if (typeof itemOrId === "string") return item.productId === itemOrId
            else return item.productId === itemOrId.productId
        })

        if (typeof itemOrId === "string") {
            if (foundIndex >= 0 && typeof quantity === "number" && quantity > 0) {
                this.props.items[foundIndex].quantity += quantity
                return true
            } else {
                return false
            }
        }

        if (itemOrId.quantity > 0) {
            if (foundIndex >= 0) {
                this.props.items[foundIndex].quantity += itemOrId.quantity
            } else {
                this.props.items.push(itemOrId)
            }
        }
    }
}
