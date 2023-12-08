import { Cart } from "@/@core/shared/entities/cart/cart"
import { GetCartByUserIdRepository } from "../../repositories/cart/getCartByUserIdRepository"

export class GetCartByUserIdUseCase {
    constructor(private readonly getCartByUserIdRepository: GetCartByUserIdRepository) {}

    public async execute(userId: string): Promise<Cart> {
        const userCart = await this.getCartByUserIdRepository.getById(userId)

        if (userCart) {
            return userCart
        }

        return Cart.createEmptyCart()
    }
}
