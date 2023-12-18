import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { ProductProps } from "../../../../shared/entities/product/product"
import { GetProductsRepository } from "../../repositories/product/getProductsRepository"
import { ProductType } from "../../repositories/product/protocols"

export class DbGetProductsUseCase {
    constructor(private readonly getProductsRepository: GetProductsRepository) {}

    public async execute(type: ProductType): Promise<ProductProps[] | CartProduct[]> {
        const products = await this.getProductsRepository.getAll(type)

        return products
    }
}
