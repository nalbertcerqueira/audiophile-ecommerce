import { ProductProps } from "../../entities/product"

export interface GetProductsByCategoryRepository {
    getByCategory(category: string): Promise<ProductProps[]>
}
