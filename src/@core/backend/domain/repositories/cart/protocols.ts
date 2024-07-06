import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
export type { UserInfo } from "../../protocols"

export type InsertionDetails = Pick<CartProduct, "productId" | "quantity">

export interface RemovalDetails {
    item: Pick<CartProduct, "productId" | "quantity">
    type: "delete" | "decrease"
}
