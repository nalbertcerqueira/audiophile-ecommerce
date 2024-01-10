import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserType } from "@/@core/shared/entities/user/user"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"

export class DbGetCartUseCase {
    constructor(private readonly getCartRepository: GetCartRepository) {}

    public async execute(userId: string, userType: UserType): Promise<Cart> {
        const userCart = await this.getCartRepository.getCartById(userId, userType)

        return userCart ? userCart : Cart.empty()
    }
}
