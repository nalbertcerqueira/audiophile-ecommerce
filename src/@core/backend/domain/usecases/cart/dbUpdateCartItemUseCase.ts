import { GetCartItemRepository } from "../../repositories/cart/getCartItemRepository"
import { DeleteCartItemRepository } from "../../repositories/cart/deleteCartItemRepository"
import { UpdateCartItemRepository } from "../../repositories/cart/updateCartItemRepository"
import { UpdateCartItemInputDTO } from "./cartDTOs"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbUpdateCartItemUseCase {
    constructor(
        private readonly getCartItemRepository: GetCartItemRepository,
        private readonly updateCartItemRepository: UpdateCartItemRepository,
        private readonly deleteCartItemRepository: DeleteCartItemRepository
    ) {}

    public async execute(data: UpdateCartItemInputDTO): Promise<Cart | null> {
        const { user, item } = data

        const foundItem = await this.getCartItemRepository.getItem(user, item.productId)
        if (!foundItem) {
            return null
        }

        if (item.quantity <= 0) {
            return await this.deleteCartItemRepository.deleteItem(user, item.productId)
        } else {
            return await this.updateCartItemRepository.updateItem(user, item)
        }
    }
}
