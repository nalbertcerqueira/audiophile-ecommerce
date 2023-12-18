import { ProductProps } from "../../../../shared/entities/product/product"

export interface GetProductsByCategoryRepository {
    getByCategory(category: string): Promise<ProductProps[]>
}
