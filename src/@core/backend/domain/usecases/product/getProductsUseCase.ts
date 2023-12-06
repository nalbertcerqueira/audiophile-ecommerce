import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { ProductProps } from "../../entities/product/product"
import { GetProductsRepository } from "../../repositories/product/getProductsRepository"
import { ProductType } from "../../repositories/product/getProductsRepository"

export class GetProductsUseCase {
    constructor(private readonly getProductsRepository: GetProductsRepository) {}

    public async execute(type: ProductType): Promise<ProductProps[] | CartProduct[]> {
        const products = await this.getProductsRepository.getAll(type)

        return products
    }
}
