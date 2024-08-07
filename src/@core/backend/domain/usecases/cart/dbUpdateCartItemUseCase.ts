import { DeleteCartItemRepository } from "../../repositories/cart/deleteCartItemRepository"
import { UpdateCartItemRepository } from "../../repositories/cart/updateCartItemRepository"
import { UpdateCartItemInputDTO } from "./cartDTOs"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbUpdateCartItemUseCase {
    constructor(
        private readonly updateCartItemRepository: UpdateCartItemRepository,
        private readonly deleteCartItemRepository: DeleteCartItemRepository
    ) {}

    public async execute(data: UpdateCartItemInputDTO): Promise<Cart | null> {
        const { user, item } = data

        if (item.quantity <= 0) {
            return await this.deleteCartItemRepository.deleteItem(user, item.productId)
        } else {
            return await this.updateCartItemRepository.updateItem(user, item)
        }
    }
}
