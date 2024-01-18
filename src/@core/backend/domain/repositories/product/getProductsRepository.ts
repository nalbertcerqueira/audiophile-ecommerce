import { ProductProps } from "../../../../shared/entities/product/product"

export interface GetProductsRepository {
    getAll(): Promise<ProductProps[]>
}
