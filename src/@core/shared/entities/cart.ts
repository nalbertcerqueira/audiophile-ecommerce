import { object, ZodType, string, number } from "zod"

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface CartProduct {
    readonly productId: string
    readonly slug: string
    name: string
    quantity: number
    price: number
}

export interface CartProps {
    accountId: string
    totalSpent: number
    itemCount: number
    items: CartProduct[]
}

export const cartItemZodSchema: ZodType<CartProduct> = object({
    productId: string().min(1),
    name: string().min(3).trim(),
    slug: string().min(3).trim().toLowerCase(),
    price: number().gt(0).finite(),
    quantity: number().gt(0).finite().int()
}).strict()

export class Cart {
    private props: CartProps
    private static readonly itemSchema: ZodType<CartProduct> = cartItemZodSchema

    public static validateItems(items: any[]): CartProduct[] {
        return items
            .map((item) => {
                const validationResult = this.itemSchema.safeParse(item)
                return validationResult.success ? validationResult.data : null
            })
            .filter((item) => item !== null) as CartProduct[]
    }

    public static createEmptyCart(): Cart {
        return new Cart({ items: [], itemCount: 0, totalSpent: 0 })
    }

    constructor(props: Optional<CartProps, "accountId">) {
        const { itemCount, totalSpent, items, accountId } = props
        const validItems = Cart.validateItems(items)
        this.props = { itemCount, totalSpent, items: validItems, accountId: accountId || "0" }
    }

    public removeItem(itemId: string): void {
        const index = this.props.items.findIndex((item) => item.productId === itemId)
        if (index >= 0) {
            this.props.items[index].quantity -= 1

            if (this.props.items[index].quantity <= 0) {
                this.props.items = this.props.items.filter((item) => item.productId !== itemId)
            }
        }
    }

    public updateTotalAndCount(): void {
        this.props.itemCount = this.getCount()
        this.props.totalSpent = this.getTotal()
    }

    public clear(): void {
        this.props = { accountId: "0", itemCount: 0, totalSpent: 0, items: [] }
    }

    public toJSON(): CartProps {
        return this.props
    }

    public addItem(itemId: string, quantity: number): boolean
    public addItem(itemToAdd: CartProduct): void
    public addItem(itemToAdd: CartProduct | string, quantity?: number): boolean | void {
        const foundIndex = this.props.items.findIndex((item) => {
            if (typeof itemToAdd === "string") return item.productId === itemToAdd
            else return item.productId === itemToAdd.productId
        })

        if (typeof itemToAdd === "string") {
            if (foundIndex >= 0 && typeof quantity === "number" && quantity > 0) {
                this.props.items[foundIndex].quantity += quantity
                return true
            } else {
                return false
            }
        }

        if (itemToAdd.quantity > 0) {
            if (foundIndex >= 0) {
                this.props.items[foundIndex].quantity += itemToAdd.quantity
            } else {
                this.props.items.push(itemToAdd)
            }
        }
    }

    private getCount(): number {
        const totalItems = this.props.items.reduce((acc, item) => {
            acc += item.quantity
            return acc
        }, 0)

        return totalItems
    }

    private getTotal(): number {
        const totalSpent = this.props.items.reduce((acc, item) => {
            acc += item.quantity * item.price
            return acc
        }, 0)

        return totalSpent
    }
}
