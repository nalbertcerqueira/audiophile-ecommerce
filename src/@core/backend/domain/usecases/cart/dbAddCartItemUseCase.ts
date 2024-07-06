import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { AddCartItemRepository } from "../../repositories/cart/addCartItemRepository"
import { CartItemInputDTO } from "./cartDTOs"
import { CartItem } from "@/@core/shared/entities/cart/cartItem"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbAddCartItemUseCase {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly addCartItemRepository: AddCartItemRepository
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

        const item = new CartItem({ ...foundProduct, quantity })
        const cart = await this.addCartItemRepository.addItem(user, item)

        return cart
    }
}
