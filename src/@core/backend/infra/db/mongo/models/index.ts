import { ProductProps } from "@/@core/backend/domain/entities/product"
import { CartProduct } from "@/@core/shared/entities/cart"
import { ObjectId } from "mongodb"

export interface MongoProduct extends Omit<ProductProps, "id"> {
    readonly _id: ObjectId
}

export interface MongoCartItem extends Omit<CartProduct, "productId"> {
    readonly productId: ObjectId
}