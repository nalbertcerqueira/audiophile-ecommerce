import { ProductProps } from "../../entities/product"
import { GetProductsRepository } from "../../repositories/getProductsRepository"

export class GetProductsUseCase {
    constructor(private readonly getProductsRepository: GetProductsRepository) {}

    public async execute(): Promise<ProductProps[]> {
        const products = await this.getProductsRepository.getAll()

        return products
    }
}
