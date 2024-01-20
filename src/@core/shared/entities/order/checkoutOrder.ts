import { CartProduct } from "../cart/cart"
import { generateCustomZodErrors } from "../helpers"
import { EntityValidationResult } from "../protocols"
import { zodCheckoutOrderSchema } from "./utils"
import * as uuid from "uuid"

export interface Costumer {
    name: string
    email: string
}

export interface Taxes {
    shipping: number
    vat: number
}

export interface Total {
    cartTotal: number
    grandTotal: number
}

export interface CheckoutOrderProps {
    orderId: string
    costumer: Costumer
    cartItems: CartProduct[]
    taxes: Taxes
    total: Total
}

export class CheckoutOrder {
    private props: CheckoutOrderProps
    public static readonly orderSchema = zodCheckoutOrderSchema

    public static calculateVAT(total: number): number {
        return total * 0.2
    }

    public static calculateShipping(): number {
        return 50
    }

    public static validateOrder(
        order: any
    ): EntityValidationResult<Omit<CheckoutOrderProps, "taxes" | "total">> {
        const validationResult = this.orderSchema
            .omit({ taxes: true, total: true })
            .safeParse(order)

        if (!validationResult.success) {
            return {
                success: false,
                errors: generateCustomZodErrors(validationResult.error, 1)
            }
        }

        return { success: true, data: validationResult.data }
    }

    constructor(props: Omit<CheckoutOrderProps, "taxes" | "total">) {
        const validationResult = CheckoutOrder.validateOrder({
            ...props,
            orderId: props.orderId ?? uuid.v4()
        })

        if (!validationResult.success) {
            const firstError = validationResult.errors[0]
            throw new Error(firstError)
        }

        const { data } = validationResult

        this.props.cartItems = data.cartItems.map((item) => ({ ...item }))
        this.props.costumer = { ...data.costumer }
        this.props.total.cartTotal = this.calculateCartTotal()
        this.props.taxes.vat = CheckoutOrder.calculateVAT(this.props.total.cartTotal)
        this.props.taxes.shipping = CheckoutOrder.calculateShipping()
        this.props.total.grandTotal = this.calculateGrandTotal()
    }

    public toJSON(): CheckoutOrderProps {
        return {
            ...this.props,
            costumer: { ...this.props.costumer },
            cartItems: this.props.cartItems.map((item) => ({ ...item }))
        }
    }

    private calculateCartTotal() {
        return this.props.cartItems.reduce(
            (acc, item) => (acc += item.quantity * item.price),
            0
        )
    }

    private calculateGrandTotal() {
        return this.props.taxes.shipping + this.props.taxes.vat + this.props.total.cartTotal
    }
}
