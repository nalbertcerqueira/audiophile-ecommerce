import { Cart } from "../../../shared/entities/cart/cart"
import { GetCartGateway } from "../../domain/gateways/cart/getCartGateway"

export class GetCartUseCase {
    constructor(private readonly getCartGateway: GetCartGateway) {}

    public async execute(): Promise<Cart> {
        const cart = await this.getCartGateway.get()

        return cart
    }
}
