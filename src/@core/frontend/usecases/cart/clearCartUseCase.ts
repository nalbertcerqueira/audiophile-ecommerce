import { Cart } from "../../../shared/entities/cart/cart"
import { ClearCartGateway } from "../../domain/gateways/cart/clearCartGateway"

export class ClearCartUseCase {
    constructor(private readonly deleteCartGateway: ClearCartGateway) {}

    public async execute(): Promise<Cart> {
        const emptyCart = await this.deleteCartGateway.clearCart()

        return emptyCart
    }
}
