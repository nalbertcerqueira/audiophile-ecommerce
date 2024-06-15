import { GetProductsOutputDTO } from "./productDTOs"
import { GetProductsRepository } from "../../repositories/product/getProductsRepository"

export class DbGetProductsUseCase {
    constructor(private readonly getProductsRepository: GetProductsRepository) {}

    public async execute(): Promise<GetProductsOutputDTO> {
        const products = await this.getProductsRepository.getAll()

        return products
    }
}
