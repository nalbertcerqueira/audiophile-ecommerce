import { AddManyCartItemsRepository } from "../../repositories/cart/addManyCartItemsRepository"
import { CartProduct } from "@/@core/shared/entities/cart/cart"
import { UserInfo } from "./protocols"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbAddProductsToCartUseCase {
    constructor(private readonly addManyCartItemsRepository: AddManyCartItemsRepository) {}

    public async execute(userInfo: UserInfo, products: CartProduct[]): Promise<Cart | null> {
        if (products.length) {
            const { id, type } = userInfo
            const cart = await this.addManyCartItemsRepository.addManyItems(id, type, products)

            return cart
        }

        return null
    }
}
