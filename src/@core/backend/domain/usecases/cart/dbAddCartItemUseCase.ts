import { AddCartItemRepository } from "../../repositories/cart/addCartItemRepository"
import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { CartItemInfo, UserInfo } from "./protocols"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbAddCartItemUseCase {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly addCartItemRepository: AddCartItemRepository
    ) {}

    public async execute(userInfo: UserInfo, product: CartItemInfo): Promise<Cart | null> {
        const { id, type } = userInfo

        const foundProduct = await this.getProductByIdRepository.getById(
            product.productId,
            "shortProduct"
        )

        if (foundProduct) {
            const cart = await this.addCartItemRepository.addItem(id, type, { ...product })

            return cart
        }

        return null
    }
}
