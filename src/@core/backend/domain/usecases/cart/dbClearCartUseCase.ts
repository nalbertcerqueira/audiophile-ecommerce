import { Cart } from "@/@core/shared/entities/cart/cart"
import { UserInfo } from "../../protocols"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"

export class DbClearCartUseCase {
    constructor(private readonly clearCartRepository: ClearCartRepository) {}

    public async execute(user: UserInfo): Promise<Cart> {
        const { id, type } = user

        await this.clearCartRepository.clearCartById({ id, type })

        return Cart.empty()
    }
}
