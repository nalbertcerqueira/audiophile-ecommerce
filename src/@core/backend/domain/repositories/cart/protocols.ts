import { CartProduct } from "@/@core/shared/entities/cart/cart"

export interface RemovalDetails extends Pick<CartProduct, "productId" | "quantity"> {
    type: "delete" | "decrease"
}

export type InsertionDetails = Pick<CartProduct, "productId" | "quantity">
