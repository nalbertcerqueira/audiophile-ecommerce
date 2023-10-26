import { Cart } from "../../../shared/entities/cart"
import { GetCartGateway } from "../../domain/gateways/getCartGateway"

export class GetCartUseCase {
    constructor(private readonly getCartGateway: GetCartGateway) {}

    public async execute(): Promise<Cart> {
        const cart = await this.getCartGateway.get()

        if (!cart) {
            const emptyCart = Cart.createEmptyCart()
            return emptyCart
        }

        return cart
    }
}
