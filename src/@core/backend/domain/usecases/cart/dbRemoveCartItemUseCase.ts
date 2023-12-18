import { RemoveCartItemRepository } from "../../repositories/cart/removeCartItemRepository"
import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { GetCartItemRepository } from "../../repositories/cart/getCartItemRepository"
import { CartItemInfo, UserInfo } from "./protocols"
import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbRemoveCartItemUseCase {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly getCartItemRepository: GetCartItemRepository,
        private readonly removeCartItemRepository: RemoveCartItemRepository
    ) {}

    public async execute(userInfo: UserInfo, itemInfo: CartItemInfo): Promise<Cart | null> {
        const { productId, quantity } = itemInfo
        const { id, type } = userInfo

        const foundProduct = (await this.getProductByIdRepository.getById(
            productId,
            "shortProduct"
        )) as CartProduct

        if (foundProduct) {
            const foundCartItem = await this.getCartItemRepository.getItem(id, type, productId)

            if (foundCartItem) {
                const cart = await this.removeCartItemRepository.removeItem(id, type, {
                    type: foundCartItem.quantity - quantity < 1 ? "delete" : "decrease",
                    productId,
                    quantity
                })

                return cart || Cart.empty(type, id)
            }
        }

        return null
    }
}
