import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { ProductProps } from "../../../../shared/entities/product/product"
import { ProductType } from "./protocols"

export interface GetProductsRepository {
    getAll(type: ProductType): Promise<ProductProps[] | CartProduct[]>
}
