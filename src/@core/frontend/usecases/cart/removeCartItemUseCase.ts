import { Cart } from "../../../shared/entities/cart/cart"
import { RemoveCartItemGateway } from "../../domain/gateways/cart/removeCartItemGateway"

export class RemoveCartItemUseCase {
    constructor(private readonly removeCartItemGateway: RemoveCartItemGateway) {}

    public async execute(itemId: string, quantity: number): Promise<Cart> {
        const cart = await this.removeCartItemGateway.removeItem(itemId, quantity)

        return cart
    }
}
