import { Cart } from "../../../shared/entities/cart"
import { RemoveCartItemGateway } from "../../domain/gateways/removeCartItemGateway"

export class RemoveCartItemUseCase {
    constructor(private readonly removeCartItemGateway: RemoveCartItemGateway) {}

    public async execute(itemId: string): Promise<Cart> {
        const cart = await this.removeCartItemGateway.removeItem(itemId)

        return cart
    }
}
