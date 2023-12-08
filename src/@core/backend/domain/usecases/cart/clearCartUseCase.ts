import { Cart } from "@/@core/shared/entities/cart/cart"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"

export class ClearCartUseCase {
    constructor(private readonly clearCartRepository: ClearCartRepository) {}

    public async execute(userId: string): Promise<Cart> {
        await this.clearCartRepository.clearCartById(userId)

        return Cart.empty(userId)
    }
}
