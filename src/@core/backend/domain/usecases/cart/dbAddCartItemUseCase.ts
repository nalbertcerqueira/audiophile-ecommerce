import { GetProductByIdRepository } from "../../repositories/product/getProductByIdRepository"
import { AddCartItemsRepository } from "../../repositories/cart/addCartItemsRepository"
import { CartItemInputDTO } from "./cartDTOs"
import { CartItem } from "@/@core/shared/entities/cart/cartItem"
import { Cart } from "@/@core/shared/entities/cart/cart"

export class DbAddCartItemUseCase {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly addCartItemsRepository: AddCartItemsRepository
    ) {}

    public async execute(data: CartItemInputDTO): Promise<Cart | null> {
        const { user, itemRef } = data
        const foundProduct = await this.getProductByIdRepository.getById(
            itemRef.productId,
            "shortProduct"
        )

        if (!foundProduct) {
            return null
        }

        const newItem = new CartItem({ ...foundProduct, quantity: itemRef.quantity })
        const cart = await this.addCartItemsRepository.addItems(user, [newItem])

        return cart
    }
}
