import { CartProduct } from "../cart/cart"
import { generateCustomZodErrors } from "../helpers"
import { EntityValidationResult, Optional } from "../protocols"
import { zodCheckoutOrderSchema } from "./utils"
import * as uuid from "uuid"

export interface Costumer {
    name: string
    email: string
}

export interface Taxes {
    vat: number
    shipping: number
}

export interface CheckoutOrderProps {
    orderId: string
    costumer: Costumer
    cartItems: CartProduct[]
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

    constructor(props: Optional<CheckoutOrderProps, "orderId">) {
        const validationResult = CheckoutOrder.validateOrder({
            ...props,
            orderId: props.orderId ?? uuid.v4()
        })

        if (!validationResult.success) {
            const firstError = validationResult.errors[0]
            throw new Error(firstError)
        }

        const { data } = validationResult
        this.props = {
            orderId: data.orderId,
            costumer: { ...data.costumer },
            cartItems: data.cartItems.map((item) => ({ ...item }))
        }
    }

    public toJSON(): CheckoutOrderProps {
        return {
            ...this.props,
            costumer: { ...this.props.costumer },
            cartItems: this.props.cartItems.map((item) => ({ ...item }))
        }
    }

    public calculateVAT(): number {
        const vat = this.calculateCartTotal() * 0.2
        return parseFloat(vat.toFixed(2))
    }

    public calculateShipping(): Taxes["shipping"] {
        return 50
    }

    public calculateCartTotal(): number {
        return this.props.cartItems.reduce(
            (acc, item) => (acc += item.quantity * item.price),
            0
        )
    }

    public calculateGrandTotal(): number {
        return this.calculateCartTotal() + this.calculateShipping() + this.calculateVAT()
    }
}
