import { AddCartItemRepository } from "../../repositories/cart/addCartItemRepository"
import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { CartItemInfo, UserInfo } from "./protocols"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbAddCartItemUseCase {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly addCartItemRepository: AddCartItemRepository
    ) {}

    public async execute(userInfo: UserInfo, itemInfo: CartItemInfo): Promise<Cart | null> {
        const { productId, quantity } = itemInfo
        const { id, type } = userInfo

        const foundProduct = await this.getProductByIdRepository.getById(
            productId,
            "shortProduct"
        )

        if (foundProduct) {
            const productToAdd = { ...foundProduct, quantity }
            const cart = await this.addCartItemRepository.addItem(id, type, productToAdd)

            return cart
        }

        return null
    }
}
