import { Cart } from "@/@core/shared/entities/cart/cart"
import { CartItemInputDTO } from "./cartDTOs"
import { GetCartItemRepository } from "../../repositories/cart/getCartItemRepository"
import { RemoveCartItemRepository } from "../../repositories/cart/removeCartItemRepository"
import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"

export class DbRemoveCartItemUseCase {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly getCartItemRepository: GetCartItemRepository,
        private readonly removeCartItemRepository: RemoveCartItemRepository
    ) {}

    public async execute(data: CartItemInputDTO): Promise<Cart | null> {
        const { user, productId, quantity } = data

        const foundProduct = await this.getProductByIdRepository.getById(
            productId,
            "shortProduct"
        )
        if (!foundProduct) {
            return null
        }

        const foundItem = await this.getCartItemRepository.getItem(user, productId)
        if (!foundItem) {
            return null
        }

        const cart = await this.removeCartItemRepository.removeItem(user, {
            type: foundItem.quantity - quantity < 1 ? "delete" : "decrease",
            item: { productId: foundItem.productId, quantity: quantity }
        })

        return cart || Cart.empty()
    }
}
