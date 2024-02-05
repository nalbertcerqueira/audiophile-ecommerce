import { ProductProps } from "@/@core/shared/entities/product/product"
import { UserProps } from "@/@core/shared/entities/user/user"
import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { UserType } from "@/@core/shared/entities/user/user"
import { ObjectId } from "mongodb"
import { ExternalUserProps } from "@/@core/shared/entities/user/externalUser"
import { CheckoutOrderProps } from "@/@core/shared/entities/order/checkoutOrder"

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

export interface MongoExternalUser extends ExternalUserProps {
    readonly _id: ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface MongoCartItem extends Pick<CartProduct, "productId" | "quantity"> {
    readonly _id: ObjectId
    readonly userId: string
    readonly userType: UserType
    createdAt: Date
    updatedAt: Date
}

export interface MongoCheckoutOrder extends Omit<CheckoutOrderProps, "cartItems"> {
    readonly _id: ObjectId
    readonly userId: string
    readonly userType: UserType
    cartItems: Pick<CartProduct, "productId" | "quantity">[]
    createdAt: Date
}
