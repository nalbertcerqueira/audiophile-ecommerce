import { ProductProps } from "@/@core/shared/entities/product/product"
import { UserProps } from "@/@core/shared/entities/user/user"
import { CartProduct, UserType } from "@/@core/shared/entities/cart/cart"
import { ObjectId } from "mongodb"

export interface MongoProduct extends Omit<ProductProps, "id"> {
    readonly _id: ObjectId
}

export interface MongoShortProduct extends Omit<CartProduct, "productId"> {
    readonly productId: ObjectId
}

export interface MongoUser extends UserProps {
    readonly _id: ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface MongoCartItem extends CartProduct {
    readonly _id: ObjectId
    readonly productId: string
    readonly userId: string
    readonly userType: UserType
    createdAt: Date
}
