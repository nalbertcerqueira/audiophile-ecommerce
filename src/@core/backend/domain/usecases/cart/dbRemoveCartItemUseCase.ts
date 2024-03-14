import { RemoveCartItemRepository } from "../../repositories/cart/removeCartItemRepository"
import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { GetCartItemRepository } from "../../repositories/cart/getCartItemRepository"
import { CartItemInfo, UserInfo } from "./protocols"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbRemoveCartItemUseCase {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly getCartItemRepository: GetCartItemRepository,
        private readonly removeCartItemRepository: RemoveCartItemRepository
    ) {}

    public async execute(userInfo: UserInfo, product: CartItemInfo): Promise<Cart | null> {
        const { productId, quantity } = product
        const { userId, type } = userInfo

        const foundProduct = await this.getProductByIdRepository.getById(
            productId,
            "shortProduct"
        )

        if (!foundProduct) {
            return null
        }

        const foundCartItem = await this.getCartItemRepository.getItem(
            { userId, type },
            productId
        )

        if (!foundCartItem) {
            return null
        }

        const cart = await this.removeCartItemRepository.removeItem(
            { userId, type },
            {
                type: foundCartItem.quantity - quantity < 1 ? "delete" : "decrease",
                productId,
                quantity
            }
        )

        return cart || Cart.empty()
    }
}
