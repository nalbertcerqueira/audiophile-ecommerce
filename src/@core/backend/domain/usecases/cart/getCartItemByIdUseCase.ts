import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { GetCartItemByIdRepository } from "../../repositories/cart/getCartItemByIdRepository"

export class GetCartItemsByIdUseCase {
    constructor(private readonly cartItemRepository: GetCartItemByIdRepository) {}

    public async execute(itemId: string): Promise<CartProduct | null> {
        const foundItem = await this.cartItemRepository.getById(itemId)
        return foundItem
    }
}
