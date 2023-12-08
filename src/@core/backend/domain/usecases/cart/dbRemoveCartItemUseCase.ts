import { RemoveCartItemRepository } from "../../repositories/cart/removeCartItemRepository"
import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { GetCartItemRepository } from "../../repositories/cart/getCartItemRepository"
import { CartItemInfo } from "./protocols"
import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbRemoveCartItemUseCase {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly getCartItemRepository: GetCartItemRepository,
        private readonly removeCartItemRepository: RemoveCartItemRepository
    ) {}

    public async execute(userId: string, itemInfo: CartItemInfo): Promise<Cart | null> {
        const { productId, quantity } = itemInfo

        const foundProduct = (await this.getProductByIdRepository.getById(
            productId,
            "shortProduct"
        )) as CartProduct

        if (foundProduct) {
            const foundCartItem = await this.getCartItemRepository.getItem(userId, productId)

            if (foundCartItem) {
                const cart = await this.removeCartItemRepository.removeItem(userId, {
                    type: foundCartItem.quantity - quantity < 1 ? "delete" : "decrease",
                    productId,
                    quantity
                })

                return cart || Cart.empty(userId)
            }

            throw new Error(`There is no item with id: '${productId}' in the cart`)
        }

        return null
    }
}
