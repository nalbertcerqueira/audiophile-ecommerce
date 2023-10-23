import { CartProduct } from "@/@core/shared/entities/cart"
import { GetCartItemsRepository } from "../../repositories/cart/getCartItemsRepository"

export class GetCartItemsUseCase {
    constructor(private readonly cartItemRepository: GetCartItemsRepository) {}

    public async execute(): Promise<CartProduct[]> {
        const items = await this.cartItemRepository.getAll()
        return items
    }
}
