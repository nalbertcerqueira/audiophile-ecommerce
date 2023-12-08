import { AddCartItemRepository } from "../../repositories/cart/addCartItemRepository"
import { Cart, CartProduct } from "@/@core/shared/entities/cart/cart"
import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { CartItemInfo } from "./protocols"

export class DbAddCartItemUseCase {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly addCartItemRepository: AddCartItemRepository
    ) {}

    public async execute(userId: string, itemInfo: CartItemInfo): Promise<Cart | null> {
        const { productId, quantity } = itemInfo
        const foundProduct = (await this.getProductByIdRepository.getById(
            productId,
            "shortProduct"
        )) as CartProduct

        if (foundProduct) {
            const productToAdd = { ...foundProduct, quantity }
            const cart = await this.addCartItemRepository.addItem(userId, productToAdd)

            return cart
        }

        return null
    }
}
