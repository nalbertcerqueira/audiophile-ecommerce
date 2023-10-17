import { ProductProps } from "../../entities/product"
import { GetProductsRepository } from "../../repositories/getProductsRepository"

export class GetProductsUseCase {
    constructor(private getProductsRepository: GetProductsRepository) {}

    public async execute(): Promise<ProductProps[]> {
        const products = await this.getProductsRepository.getAll()

        return products
    }
}
