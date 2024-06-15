import { AddCartItemRepository } from "../../repositories/cart/addCartItemRepository"
import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { CartItemInputDTO } from "./cartDTOs"
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

        const cart = await this.addCartItemRepository.addItem(user, { productId, quantity })
        return cart
    }
}
