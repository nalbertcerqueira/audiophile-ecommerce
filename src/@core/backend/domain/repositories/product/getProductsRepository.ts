import { ProductProps } from "../../entities/product/product"

export interface GetProductsRepository {
    getAll(): Promise<ProductProps[]>
}
