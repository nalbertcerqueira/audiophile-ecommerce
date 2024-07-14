import { checkoutOrderZodSchema } from "./utils"
import { CartProduct } from "../cart/cartItem"
import { Optional } from "../protocols"
import { Entity } from "../helpers"
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
    items: CartProduct[]
    taxes: Taxes
}

//Entidade utilizada para representar o pedido de compras do usuário após o checkout
export class CheckoutOrder extends Entity<CheckoutOrderProps> {
    private props: CheckoutOrderProps
    private orderSchema = checkoutOrderZodSchema

    public static calculateVAT(value: number): number {
        const vat = value * 0.2
        return parseFloat(vat.toFixed(2))
    }

    public static calculateShipping(): number {
        return 50
    }

    constructor(props: Optional<CheckoutOrderProps, "orderId">) {
        super()
        const order = { ...props, orderId: props.orderId ?? uuid.v4() }
        const validation = this.validate(order, this.orderSchema)

        if (!validation.success) {
            const firstError = validation.errors[0]
            throw new Error(firstError)
        }

        this.props = {
            orderId: validation.data.orderId,
            customer: { ...validation.data.customer },
            taxes: { ...validation.data.taxes },
            items: validation.data.items.map((item) => ({ ...item }))
        }
    }

    public toJSON(): CheckoutOrderProps {
        return {
            ...this.props,
            customer: { ...this.props.customer },
            taxes: { ...this.props.taxes },
            items: this.props.items.map((item) => ({ ...item }))
        }
    }

    public calculateCartTotal(): number {
        return this.props.items.reduce((acc, item) => (acc += item.quantity * item.price), 0)
    }

    public calculateGrandTotal(): number {
        const totalTaxes = this.props.taxes.vat + this.props.taxes.shipping
        return this.calculateCartTotal() + totalTaxes
    }
}
