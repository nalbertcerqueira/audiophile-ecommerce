import { ProductProps } from "../../entities/product/product"
import { GetProductsByCategoryRepository } from "../../repositories/product/getProductsByCategoryRepository"

export class DbGetProductsByCategoryUseCase {
    constructor(
        private readonly getProductsByCategoryRepository: GetProductsByCategoryRepository
    ) {}

    public async execute(category: string): Promise<ProductProps[]> {
        const products = await this.getProductsByCategoryRepository.getByCategory(category)

        return products
    }
}
