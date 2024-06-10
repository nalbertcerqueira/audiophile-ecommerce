import { CartProduct } from "@/@core/shared/entities/cart/cart"

export type { UserInfo } from "../../protocols"

export interface RemovalDetails extends Pick<CartProduct, "productId" | "quantity"> {
    type: "delete" | "decrease"
}

export type InsertionDetails = Pick<CartProduct, "productId" | "quantity">
