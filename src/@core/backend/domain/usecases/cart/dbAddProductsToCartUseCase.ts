import { AddManyCartItemsRepository } from "../../repositories/cart/addManyCartItemsRepository"
import { CartItemInfo, UserInfo } from "./protocols"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbAddProductsToCartUseCase {
    constructor(private readonly addManyCartItemsRepository: AddManyCartItemsRepository) {}

    public async execute(userInfo: UserInfo, products: CartItemInfo[]): Promise<Cart | null> {
        const { userId, type } = userInfo

        if (!products.length) {
            return null
        }

        const cart = await this.addManyCartItemsRepository.addManyItems(
            { userId, type },
            products
        )
        return cart
    }
}
