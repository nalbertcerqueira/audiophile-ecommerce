import { DeleteCartItemRepository } from "../../repositories/cart/deleteCartItemRepository"
import { UpdateCartItemRepository } from "../../repositories/cart/updateCartItemRepository"
import { CartItemInputDTO } from "./cartDTOs"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbUpdateCartItemUseCase {
    constructor(
        private readonly updateCartItemRepository: UpdateCartItemRepository,
        private readonly deleteCartItemRepository: DeleteCartItemRepository
    ) {}

    public async execute(data: CartItemInputDTO): Promise<Cart | null> {
        const { user, itemRef } = data

        if (itemRef.quantity <= 0) {
            return await this.deleteCartItemRepository.deleteItem(user, itemRef.productId)
        } else {
            return await this.updateCartItemRepository.updateItem(user, itemRef)
        }
    }
}
