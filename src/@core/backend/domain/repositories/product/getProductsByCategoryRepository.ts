import { ProductProps } from "../../entities/product/product"

export interface GetProductsByCategoryRepository {
    getByCategory(category: string): Promise<ProductProps[]>
}
