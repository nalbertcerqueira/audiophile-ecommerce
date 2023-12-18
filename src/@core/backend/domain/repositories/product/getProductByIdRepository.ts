import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { ProductProps } from "../../../../shared/entities/product/product"
import { ProductType } from "./protocols"

export interface GetProductByIdRepository {
    getById(productId: string, type: ProductType): Promise<ProductProps | CartProduct | null>
}
