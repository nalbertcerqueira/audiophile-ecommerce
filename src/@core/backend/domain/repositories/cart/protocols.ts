export type { UserInfo } from "../../protocols"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"

export type InsertionDetails = Pick<CartProduct, "productId" | "quantity">

export interface RemovalDetails extends Pick<CartProduct, "productId" | "quantity"> {
    type: "delete" | "decrease"
}
