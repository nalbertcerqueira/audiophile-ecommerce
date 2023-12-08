import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { ProductType } from "../../repositories/product/protocols"
import { ProductProps } from "../../entities/product/product"

export class DbGetProductByIdUseCase {
    constructor(private readonly getProductByIdRepository: GetProductByIdRepository) {}

    public async execute(
        itemId: string,
        type: ProductType
    ): Promise<ProductProps | CartProduct | null> {
        const foundItem = await this.getProductByIdRepository.getById(itemId, type)
        return foundItem
    }
}
