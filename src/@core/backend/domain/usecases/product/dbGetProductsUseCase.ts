import { ProductProps } from "../../../../shared/entities/product/product"
import { GetProductsRepository } from "../../repositories/product/getProductsRepository"

export class DbGetProductsUseCase {
    constructor(private readonly getProductsRepository: GetProductsRepository) {}

    public async execute(): Promise<ProductProps[]> {
        const products = await this.getProductsRepository.getAll()

        return products
    }
}
