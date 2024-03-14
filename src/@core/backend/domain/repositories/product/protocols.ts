import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { ProductProps } from "@/@core/shared/entities/product/product"

export type ProductType = "fullProduct" | "shortProduct"

export type ProductFromType<T extends ProductType> = T extends "fullProduct"
    ? ProductProps
    : CartProduct
