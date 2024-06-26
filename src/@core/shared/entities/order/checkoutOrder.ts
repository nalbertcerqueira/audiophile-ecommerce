import { CartProps } from "../cart/cart"
import { generateCustomZodErrors } from "../helpers"
import { EntityValidationResult, Optional } from "../protocols"
import { checkoutOrderZodSchema } from "./utils"
import * as uuid from "uuid"

export interface Customer {
    fullName: string
    email: string
}

export interface Taxes {
    vat: number
    shipping: number
}

export interface CheckoutOrderProps {
    orderId: string
    customer: Customer
    cart: CartProps
    taxes: Taxes
}

//Entidade utilizada para representar o pedido de compras do usuário após o checkout
export class CheckoutOrder {
    private props: CheckoutOrderProps
    public static readonly orderSchema = checkoutOrderZodSchema

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

    public static calculateVAT(value: number): number {
        const vat = value * 0.2
        return parseFloat(vat.toFixed(2))
    }

    public static calculateShipping(): number {
        return 50
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
            customer: { ...data.customer },
            taxes: { ...data.taxes },
            cart: { items: data.cart.items.map((item) => ({ ...item })) }
        }
    }

    public toJSON(): CheckoutOrderProps {
        return {
            ...this.props,
            customer: { ...this.props.customer },
            taxes: { ...this.props.taxes },
            cart: { items: this.props.cart.items.map((item) => ({ ...item })) }
        }
    }

    public calculateCartTotal(): number {
        return this.props.cart.items.reduce(
            (acc, item) => (acc += item.quantity * item.price),
            0
        )
    }

    public calculateGrandTotal(): number {
        const totalTaxes = this.props.taxes.vat + this.props.taxes.shipping
        return this.calculateCartTotal() + totalTaxes
    }
}
