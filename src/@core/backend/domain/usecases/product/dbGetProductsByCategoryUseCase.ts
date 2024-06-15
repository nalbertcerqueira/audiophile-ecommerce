import { GetProductsOutputDTO } from "./productDTOs"
import { GetProductsByCategoryRepository } from "../../repositories/product/getProductsByCategoryRepository"

export class DbGetProductsByCategoryUseCase {
    constructor(
        private readonly getProductsByCategoryRepository: GetProductsByCategoryRepository
    ) {}

    public async execute(category: string): Promise<GetProductsOutputDTO> {
        const products = await this.getProductsByCategoryRepository.getByCategory(category)

        return products
    }
}
