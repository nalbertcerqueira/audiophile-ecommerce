import { CartProduct } from "../cart/cart"
import { generateCustomZodErrors } from "../helpers"
import { EntityValidationResult, Optional } from "../protocols"
import { zodCheckoutOrderSchema } from "./utils"
import * as uuid from "uuid"

export interface Costumer {
    name: string
    email: string
}

export interface CheckoutOrderProps {
    orderId: string
    costumer: Costumer
    cartItems: CartProduct[]
    totalSpent: number
}

export class CheckoutOrder {
    private props: CheckoutOrderProps
    public static readonly orderSchema = zodCheckoutOrderSchema

    public static validateOrder(order: any): EntityValidationResult<CheckoutOrderProps> {
        const validationResult = this.orderSchema.safeParse(order)

        if (!validationResult.success) {
            return {
                success: false,
                errors: generateCustomZodErrors(validationResult.error, 1)
            }
        }

        return { success: true, data: validationResult.data }
    }

    constructor(props: Optional<CheckoutOrderProps, "orderId" | "totalSpent">) {
        const validationResult = CheckoutOrder.validateOrder({
            ...props,
            orderId: props.orderId ?? uuid.v4(),
            totalSpent: props.totalSpent ?? 0
        })

        if (!validationResult.success) {
            const firstError = validationResult.errors[0]
            throw new Error(firstError)
        }

        const { data } = validationResult

        this.props.orderId = data.orderId
        this.props.cartItems = data.cartItems.map((item) => ({ ...item }))
        this.props.costumer = { ...data.costumer }
        this.props.totalSpent = data.cartItems.reduce(
            (acc, item) => (acc += item.quantity * item.price),
            0
        )
    }

    public toJSON(): CheckoutOrderProps {
        return {
            ...this.props,
            costumer: { ...this.props.costumer },
            cartItems: this.props.cartItems.map((item) => ({ ...item }))
        }
    }
}
