import { Cart, UserType } from "@/@core/shared/entities/cart/cart"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"

export class DbClearCartUseCase {
    constructor(private readonly clearCartRepository: ClearCartRepository) {}

    public async execute(userId: string, userType: UserType): Promise<Cart> {
        await this.clearCartRepository.clearCartById(userId, userType)

        return Cart.empty(userType, userId)
    }
}
