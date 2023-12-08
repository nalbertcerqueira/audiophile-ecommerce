import { Cart } from "@/@core/shared/entities/cart/cart"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"

export class DbGetCartUseCase {
    constructor(private readonly getCartRepository: GetCartRepository) {}

    public async execute(userId: string): Promise<Cart> {
        const userCart = await this.getCartRepository.getCartById(userId)

        if (userCart) {
            return userCart
        }

        return Cart.empty(userId)
    }
}
