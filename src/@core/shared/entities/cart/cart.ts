import { cartItemZodSchema } from "./util"

export type UserType = "authenticated" | "guest"

export interface CartProduct {
    readonly productId: string
    readonly slug: string
    name: string
    quantity: number
    price: number
}

export interface CartProps {
    userId: string
    userType: UserType
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

    public static empty(userType: UserType, userId: string): Cart {
        return new Cart({ userId, userType, items: [], itemCount: 0, totalSpent: 0 })
    }

    constructor(props: CartProps) {
        const { itemCount, totalSpent, items, userType, userId } = props
        const validItems = Cart.validateItems(items)
        this.props = {
            itemCount,
            totalSpent,
            items: validItems,
            userType,
            userId: userId || "0"
        }
    }

    public toJSON(): CartProps {
        return this.props
    }
}
