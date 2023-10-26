import { Cart } from "../../../shared/entities/cart"
import { DeleteCartGateway } from "../../domain/gateways/deleteCartGateway"

export class ClearCartUseCase {
    constructor(private readonly deleteCartGateway: DeleteCartGateway) {}

    public async execute(): Promise<Cart> {
        const emptyCart = await this.deleteCartGateway.deleteCart()

        return emptyCart
    }
}
