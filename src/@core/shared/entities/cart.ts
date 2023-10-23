import { object, ZodType, string, number } from "zod"

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

const cartItemZodSchema: ZodType<CartProduct> = object({
    productId: string().min(1),
    name: string().min(3).trim().toUpperCase(),
    slug: string().min(3).trim().toLowerCase(),
    price: number().gt(0).finite(),
    quantity: number().gt(0).finite().int()
}).strict()

export class Cart {
    private static readonly itemSchema: ZodType<CartProduct> = cartItemZodSchema

    constructor(private props: CartProps) {}

    public static createEmptyCart(): Cart {
        return new Cart({ items: [], itemCount: 0, totalSpent: 0 })
    }

    public static validateItem(data: any): boolean {
        const validationResult = this.itemSchema.safeParse(data)
        return validationResult.success
    }

    public addItem(itemToAdd: CartProduct): void {
        if (itemToAdd.quantity > 0) {
            const callback = (item: CartProduct) => item.productId === itemToAdd.productId
            const index = this.props.items.findIndex(callback)

            if (index >= 0) {
                this.props.items[index].quantity += itemToAdd.quantity
            } else {
                this.props.items.push(itemToAdd)
            }
        }
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
        this.props = { itemCount: 0, totalSpent: 0, items: [] }
    }

    public toJSON(): CartProps {
        return this.props
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
