import { ProductProps } from "../entities/product"

export interface GetProductsRepository {
    getAll(): Promise<ProductProps[]>
}
