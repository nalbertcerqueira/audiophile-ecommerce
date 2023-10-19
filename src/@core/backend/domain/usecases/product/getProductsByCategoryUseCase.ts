import { ProductProps } from "../../entities/product"
import { GetProductsByCategoryRepository } from "../../repositories/getProductsByCategoryRepository"

export class GetProductsByCategoryUseCase {
    constructor(
        private readonly getProductsByCategoryRepository: GetProductsByCategoryRepository
    ) {}

    public async execute(category: string): Promise<ProductProps[]> {
        const products = await this.getProductsByCategoryRepository.getByCategory(category)

        return products
    }
}
