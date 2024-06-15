import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserInfo } from "../../protocols"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"

export class DbGetCartUseCase {
    constructor(private readonly getCartRepository: GetCartRepository) {}

    public async execute(user: UserInfo): Promise<Cart> {
        const { id, type } = user
        const userCart = await this.getCartRepository.getCartById({ id, type })

        return userCart ? userCart : Cart.empty()
    }
}
